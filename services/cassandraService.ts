import * as dotenv from "dotenv";
import { CassandraStore } from "langchain/vectorstores/cassandra";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document as LangchainDocument } from "langchain/document"; // This was previously "langchain": "^0.0.168" but need version with metadata filtering not yet merged
import { Paragraph } from '@/models/Paragraph';

dotenv.config();

const cassandraConfig = {
  cloud: {
    secureConnectBundle: process.env.CASSANDRA_SCB as string,
  },
  credentials: {
    username: "token",
    password: process.env.CASSANDRA_TOKEN as string,
  },
  keyspace: "nextjs",
  dimensions: 1536,
  table: "test",
  primaryKey: {name: "id",type: "text"},
  metadataColumns: [
    {name: "group_id",type: "text"},
    {name: "doc_id",type: "text"},
    {name: "paragraph_id",type: "int"},
    {name: "other_info",type: "text"},
  ],
  indices: [{name: "group_id", value: "(group_id)"}],
};

let vectorStore: CassandraStore | null = null;

export async function getCassandraStore(): Promise<CassandraStore> {
  if (!vectorStore) {
    vectorStore = await CassandraStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      cassandraConfig
    );
  }
  return vectorStore;
}

export async function similaritySearch(query: string, documentsToFind: number = 1, groupId: string): Promise<Paragraph[]> {
  let filter: { group_id?: string } = {};
  if (groupId) {
    filter.group_id = groupId;
  }
  const vectorStore = await getCassandraStore();  
  const rawResults = await vectorStore.similaritySearch(query, documentsToFind, filter);
  return rawResults.map((doc: any) => ({
    text: doc.pageContent,
    metadata: {
      group_id: doc.metadata.group_id,
      doc_id: doc.metadata.doc_id,
      paragraph_id: doc.metadata.paragraph_id,
      other_info: doc.metadata.other_info
    }
  }));
}

export async function saveParagraphs(paragraphs: Paragraph[]): Promise<void> {
  const vectorStore = await getCassandraStore();

  // Convert the paragraphs to the Document format
  const documents: LangchainDocument[] = paragraphs.map(paragraph => {       
    const { group_id, doc_id, paragraph_id, other_info } = paragraph.metadata;
    const id = `${group_id ? `${group_id}_` : ''}${doc_id}_${paragraph_id}`;

    return new LangchainDocument({
      pageContent: paragraph.text,
      metadata: {
        id: id,
        group_id: nullifyString(group_id),
        doc_id: doc_id,
        paragraph_id: paragraph_id,
        other_info: nullifyString(other_info)
      }
    });
  });

  // Save the documents to the Cassandra database
  await vectorStore.addDocuments(documents);
}

export async function saveParagraph(paragraph: Paragraph): Promise<void> {
  return saveParagraphs([paragraph]); // Utilize the list saver for simplicity
}

function nullifyString(value: any): any {
  return value === 'null' ? null : value;
}
