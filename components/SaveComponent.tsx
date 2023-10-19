import React, { useState } from 'react';

const SaveComponent: React.FC = () => {
  const [groupId, setGroupId] = useState<string | null>(null);
  const [docId, setDocId] = useState<string | null>(null);
  const [paragraphId, setParagraphId] = useState<number | null>(null);
  const [other_info, setOtherInfo] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);

  const handleSubmit = async () => {
    // Check if mandatory fields are set
    if (!docId || !paragraphId || !text) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    const payload = {
      group_id: groupId || null,
      doc_id: docId,
      paragraph_id: paragraphId,
      other_info: other_info || null,
      text: text,
    };

    const res = await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      alert('Data saved successfully!');
    } else {
      alert('Error saving data. Please try again.');
    }
  };

  return (
    <div className="center-container">
      <div>
        <label className="form-label" htmlFor="query-input">Group ID:</label>
        <input
          type="text"
          value={groupId || ''}
          className="form-input"
          onChange={(e) => setGroupId(e.target.value || null)}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="query-input">Doc ID:</label>
        <input
          type="text"
          value={docId || ''}
          className="form-input"
          onChange={(e) => setDocId(e.target.value || null)}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="query-input">Paragraph ID:</label>
        <input
          type="number"
          value={paragraphId === null ? '' : paragraphId}
          className="form-input"
          onChange={(e) => setParagraphId(Number(e.target.value) || null)}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="query-input">Other Info:</label>
        <input
          type="text"
          value={other_info === null ? '' : other_info}
          className="form-input"
          onChange={(e) => setOtherInfo(e.target.value || '')}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="query-input">Text:</label>
        <textarea
          value={text || ''}
          className="form-input"
          onChange={(e) => setText(e.target.value || null)}
        />
      </div>
      <button className="search-button" onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default SaveComponent;
