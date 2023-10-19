import React, { useState, FormEvent } from 'react';
import { Paragraph } from '@/models/Paragraph';
import ParagraphTable from './ParagraphTable';

const SearchComponent: React.FC = () => {
    const [searchResults, setSearchResults] = useState<Paragraph[]>([]);
    const [documentsToFind, setDocumentsToFind] = useState(1);
    const [groupId, setGroupId] = useState('');
    const [query, setQuery] = useState('');

    const handleSearch = async (query: string, documentsToFind: number = 1, groupId: string) => {
        const res = await fetch(`/api/search?query=${query}&DocumentsToFind=${documentsToFind}&GroupId=${groupId}`);
        const data = await res.json();
        setSearchResults(data.results);
    };

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        handleSearch(query, documentsToFind, groupId);
    }

    return (
        <div className="center-container">
            <form onSubmit={handleFormSubmit}>
                <label className="form-label" htmlFor="query-input">Query:</label>
                <input
                    className="form-input"
                    type="text"
                    id="query-input"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <label className="form-label" htmlFor="query-input">Group Id (optional):</label>
                <input
                    className="form-input"
                    type="text"
                    id="query-input"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                />

                <label className="form-label" htmlFor="number-input">Number of Docs to Find:</label>
                <input
                    className="form-input"
                    type="number"
                    id="number-input"
                    value={documentsToFind}
                    onChange={(e) => setDocumentsToFind(Number(e.target.value))}
                />

                <button className="search-button" type="submit">Search</button>
            </form>

            <div className="results">
                <ParagraphTable paragraphs={searchResults} />
            </div>
        </div>
    );
};

export default SearchComponent;
