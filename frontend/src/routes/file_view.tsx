import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';

const MarkdownPage = () => {
  const { filePath } = useParams(); // Get the file path from the URL
  const [content, setContent] = useState(null);

  // Replace with your GitHub username, repo name, branch, and personal access token
  const username = 'luccavp12';
  const repo = 'Obsidian';
  const branch = 'main';
  const token = '';

  useEffect(() => {
    // Fetch the content of the markdown file with authentication
    console.log(filePath);
    axios
      .get(`https://raw.githubusercontent.com/${username}/${repo}/${branch}/${filePath}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setContent(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error('Error fetching file content:', error));
  }, [filePath]);

  return (
    <div>
      <h1>{filePath.split('/').pop()}</h1>
      {content ? (
        // <ReactMarkdown>{content}</ReactMarkdown>
        content
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/">Back to Glossary</Link>
    </div>
  );
};

export default MarkdownPage;