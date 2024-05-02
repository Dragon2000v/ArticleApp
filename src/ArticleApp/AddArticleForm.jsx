import { useState } from 'react';
import Button from '../Button/Button';
import s from './ArticleApp.module.css';

export const AddArticleForm = ({ handleAddArticle }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = () => {
    handleAddArticle({ title, body, author });
  };

  return (
    <div className={s.form}>
      <h2>Add article</h2>
      <input
        className={s.input}
        onChange={e => setTitle(e.target.value)}
        type="text"
        placeholder="Enter title"
      />
      <input
        className={s.input}
        onChange={e => setBody(e.target.value)}
        type="text"
        placeholder="Enter body"
      />
      <input
        className={s.input}
        onChange={e => setAuthor(e.target.value)}
        type="text"
        placeholder="Enter author"
      />
      <Button onClick={handleSubmit}>Add</Button>
    </div>
  );
};
