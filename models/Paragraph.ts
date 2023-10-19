export interface Paragraph {
    text: string;
    metadata: {
        group_id: string;
        doc_id: string;
        paragraph_id: number;
        other_info: string;
    };
}
