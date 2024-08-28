

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Glossary = () => {
  const [files, setFiles] = useState([]);

  // Replace with your GitHub username, repo name, branch, and personal access token
  const username = 'luccavp12';
  const repo = 'Obsidian';
  const branch = 'main';
  const token = '';

  useEffect(() => {
    // Fetch list of files in the repository with authentication
    axios
      .get(`https://api.github.com/repos/${username}/${repo}/git/trees/${branch}?recursive=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const markdownFiles = response.data.tree.filter((file) =>
          file.path.endsWith('.md')
        );
        setFiles(markdownFiles);
      })
      .catch((error) => console.error('Error fetching files:', error));
  }, []);

  return (
    <div>
      <h1>Glossary</h1>
      <ul>
        {files.map((file) => (
          <li key={file.path}>
            <Link to={`/page/${encodeURIComponent(file.path)}`}>
              {file.path.split('/').pop()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Glossary;
