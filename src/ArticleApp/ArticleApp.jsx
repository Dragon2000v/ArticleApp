import { List } from './List';
import { Sidebar } from './Sidebar';
import s from './ArticleApp.module.css';

import { nanoid } from 'nanoid';
import { Favorites } from './Favorites';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Modal from '../Modal/Modal';

import { AddArticleForm } from './AddArticleForm';
import { AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './ErrorBoundary';
const initData = [
  {
    id: nanoid(),
    title: 'React is ease!',
    body: 'React is a JS lib',
    createdAT: Date.now(),
    author: 'Terry',
  },
  {
    id: nanoid(),
    title: 'JS!',
    body: 'JS is ',
    createdAT: Date.now(),
    author: 'Toni',
  },
];
export const ArticleApp = () => {
  const [articles, setArticle] = useLocalStorage('data', initData);
  const [favorites, setFavorites] = useLocalStorage('fav', []);
  const [selectedTab, setSelectedTab] = useLocalStorage('tab', 'home');
  const [isOpen, setIsOpen] = useLocalStorage('modal', false);
  const [searchStr, setSearchStr] = useLocalStorage('searchStr', '');
  const [sortType, setSortType] = useLocalStorage('sortType', '');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleDeleteArticle = id => {
    setArticle(prev => prev.filter(item => item.id !== id));
  };

  const handleAddToFavorites = article => {
    setFavorites(prev => [...prev, article]);
  };
  const handleDeleteFromFavorites = id => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const handleAddArticle = data => {
    const newArticle = { ...data, id: nanoid(), createdAT: Date.now() };
    setArticle(prev => [...prev, newArticle]);
    closeModal();
  };

  const filteredArticles = articles.filter(
    item =>
      item.title.toLowerCase().includes(searchStr.toLowerCase()) ||
      item.body.toLowerCase().includes(searchStr.toLowerCase())
  );

  const sortedArticles = () => {
    switch (sortType) {
      case 'newest':
        return filteredArticles.sort((a, b) => b.createdAT - a.createdAT);
      case 'oldest':
        return filteredArticles.sort((a, b) => a.createdAT - b.createdAT);
      case 'a-z':
        return filteredArticles.sort((a, b) => a.title.localeCompare(b.title));
      case 'z-a':
        return filteredArticles.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return filteredArticles;
    }
  };

  return (
    <div className={s.wrapperMain}>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Sidebar setSelectedTab={setSelectedTab} openModal={openModal} />
      </ErrorBoundary>
      {selectedTab === 'home' && (
        <List
          favorites={favorites}
          setSortType={setSortType}
          setSearchStr={setSearchStr}
          articles={sortedArticles()}
          handleDeleteArticle={handleDeleteArticle}
          handleAddToFavorites={handleAddToFavorites}
          handleDeleteFromFavorites={handleDeleteFromFavorites}
        />
      )}
      {selectedTab === 'fav' && (
        <Favorites
          favorites={favorites}
          onDeleteFromFavorites={handleDeleteFromFavorites}
        />
      )}
      <AnimatePresence>
        {isOpen && (
          <Modal onClose={closeModal}>
            <AddArticleForm handleAddArticle={handleAddArticle} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
