import { NextApiRequest, NextApiResponse } from 'next';
import { saveParagraph, saveParagraphs } from '@/services/cassandraService';
import { Paragraph } from '@/models/Paragraph';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }
    const { paragraphs, group_id, doc_id, paragraph_id, other_info, text } = req.body;

    // If paragraphs list is provided, save multiple paragraphs
    if (paragraphs && Array.isArray(paragraphs)) {
        await saveParagraphs(paragraphs);
    } else if (doc_id && paragraph_id && text) { // Save a single paragraph
        const paragraph: Paragraph = {
            text: text,
            metadata: {
                group_id: group_id,
                doc_id: doc_id,
                paragraph_id: paragraph_id,
                other_info: other_info
            }
        };
        await saveParagraph(paragraph);
    } else {
        return res.status(400).json({ success: false, message: 'Invalid data format!' });
    }

    res.status(200).json({ success: true, message: 'Data saved successfully!' });
};
