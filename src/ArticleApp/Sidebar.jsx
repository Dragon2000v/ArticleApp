import s from './ArticleApp.module.css';
import Button from '../Button/Button';
export const Sidebar = ({ setSelectedTab, openModal }) => {
  return (
    <aside className={s.sidebar}>
      <h1>ArticleApp</h1>
      <nav>
        <Button onClick={() => setSelectedTab('home')}>Home</Button>
        <Button onClick={() => setSelectedTab('fav')}>Favorites</Button>
        <Button onClick={openModal}>Add article</Button>
      </nav>
    </aside>
  );
};
