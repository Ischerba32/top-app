import {ProductProps} from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { Review } from '../Review/Review';
import { ForwardedRef, forwardRef, useRef, useState, MouseEvent } from 'react';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(forwardRef(({product, className, ...props}: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const variants = {
    visible: {
      opacity: 1,
      height: 'auto',
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  };

  const scrollToReview = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    e.preventDefault;
    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    reviewRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className={className} {...props} ref={ref}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          <span><span className="visuallyHidden">Цена</span>{priceRu(product.price)}</span>
          {product.oldPrice && <Tag color='green' className={styles.oldPrice}>
          <span className="visuallyHidden">Скидка</span>
            {priceRu(product.price - product.oldPrice)}
          </Tag>}
        </div>
        <div className={styles.credit}>
          <span className="visuallyHidden">В кредит</span>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
        <span className="visuallyHidden">{'Рейтинг' + (product.reviewAvg ?? product.initialRating)}</span>
          <Rating rating={product.reviewAvg ?? product.initialRating}/>
        </div>
        <div className={styles.tags}>{product.categories.map(c => <Tag color='ghost' key={c} className={styles.category}>{c}</Tag>)}</div>
        <div className={styles.priceTitle} aria-hidden={true}>цена</div>
        <div className={styles.creditTitle} aria-hidden={true}>в кредит</div>
        <div className={styles.rateTitle}><a tabIndex={0} onClick={(e) => scrollToReview(e)}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
        <Divider className={styles.hr}/>
        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map(c => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && <div className={styles.advantages}>
            <div className={styles.advTitle}>Преимущества</div>
            {product.advantages}
          </div> }
          {product.disAdvantages && <div className={styles.disadvantages}>
            <div className={styles.advTitle}>Недостатки</div>
            {product.disAdvantages}
          </div> }
        </div>
        <Divider className={cn(styles.hr, styles.hr2)}/>
        <div className={styles.actions}>
          <a href={product.link} target="_blank">
            <Button appearance='primary'>Узнать подробнее</Button>
          </a>
          <Button
            appearance='ghost'
            arrow={isReviewOpened ? 'down' : 'right'}
            className={styles.reviewButton}
            onClick={() => setIsReviewOpened(!isReviewOpened)}
            aria-expanded={isReviewOpened}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <motion.div
        animate={isReviewOpened ? 'visible' : 'hidden'}
        variants={variants}
        initial='hidden'
      >
        <Card
          color='blue'
          className={cn(styles.reviews, {
            [styles.opened]: isReviewOpened,
            [styles.closed]: !isReviewOpened,
          })}
          ref={reviewRef}
          tabIndex={isReviewOpened ? 0 : -1}
        >
          {product.reviews.map(r => (
            <div key={r._id}>
              <Review review={r}/>
              <Divider />
            </div>
          ))}
          <ReviewForm productId={product._id} isOpened={isReviewOpened}/>
        </Card>
      </motion.div>
    </div>
  );
}));