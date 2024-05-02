import { formatDistanceToNow } from 'date-fns';
import Button from '../Button/Button';
import s from './ArticleApp.module.css';
import ukLocale from 'date-fns/locale/uk';
import { FaStar } from 'react-icons/fa';

export const ArticleCard = ({
  favorites = [],
  article,
  onDeleteArticle,
  handleDeleteFromFavorites,
  onAddToFavorites,
  page,
}) => {
  const isExistInFavorites = favorites.some(item => item.id === article.id);
  return (
    <li className={s.article}>
      {isExistInFavorites && <FaStar color="gold" />}
      <h3>{article.title}</h3>
      <p>{article.body}</p>
      <span>
        {formatDistanceToNow(article.createdAT, {
          addSuffix: true,
          locale: ukLocale,
        })}
      </span>
      <span>{article.author}</span>
      <div>
        {page !== 'fav' && (
          <Button
            onClick={() =>
              isExistInFavorites
                ? handleDeleteFromFavorites(article.id)
                : onAddToFavorites(article)
            }
          >
            {isExistInFavorites ? 'Remove from favorites' : 'Add to favorites'}
          </Button>
        )}
        <Button onClick={() => onDeleteArticle(article.id)}>Delete</Button>
      </div>
    </li>
  );
};
