import s from './ArticleApp.module.css';
import { ArticleCard } from './ArticleCard';

export const Favorites = ({ favorites, onDeleteFromFavorites }) => {
  return (
    <div>
      <h2>Favorites</h2>
      <ul className={s.fav}>
        {favorites.map(item => (
          <ArticleCard
            key={item.id}
            article={item}
            onDeleteArticle={onDeleteFromFavorites}
            page="fav"
          />
        ))}
      </ul>
    </div>
  );
};
