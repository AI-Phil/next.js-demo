import React from 'react';
import { Paragraph } from '@/models/Paragraph';

interface ParagraphTableProps {
    paragraphs: Paragraph[];
}

const ParagraphTable: React.FC<ParagraphTableProps> = ({ paragraphs }) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="bold-column">Document</th>
                        <th className="bold-column">Paragraph</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {paragraphs.map((paragraph) => (
                        <tr key={paragraph.metadata.group_id+'.'+paragraph.metadata.doc_id+'.'+paragraph.metadata.paragraph_id}>
                            <td className="bold-column">{paragraph.metadata.doc_id}</td>
                            <td className="bold-column">{paragraph.metadata.paragraph_id}</td>
                            <td {...(paragraph.metadata.other_info ? {title: paragraph.metadata.other_info} : {})}>{paragraph.text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParagraphTable;
