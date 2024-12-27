import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Pic from "/Users/lkbalyan/Desktop/Ayush/UNDS Website/frontend/src/assets/watchHero_pic.png";
import styles from './WatchSection.module.css';
import WobblyCircle from '../WobblyCircle';

const WatchSection = () => {
  const handleClickToChat = () => {
    const instagramUsername = "luxury.watches";
    const instagramAppUrl = `instagram://user?username=${instagramUsername}`;
    window.location.href = instagramAppUrl;
    
    setTimeout(() => {
      if (document.hidden === false) {
        window.open(`https://ig.me/m/${instagramUsername}`, "_blank");
      }
    }, 2000);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.watch_container}>
        <main className={styles.main_content}>
          
          <div className={styles.product_info}>
            <h1 className={styles.product_title}>ROYAL OAK</h1>
            <h2 className={styles.product_subtitle}>CHRONOGRAPH</h2>
            <p className={styles.product_description}>
              A masterpiece of precision engineering and timeless elegance. 
              This self-winding chronograph features a grand tapisserie dial, 
              integrated bracelet, and legendary octagonal bezel.
            </p>
            <div className={styles.price_info}>
              <span className={styles.price} aria-label="Price">$8,500</span>
              <button className={styles.chat_button} aria-label="Click to Chat" onClick={handleClickToChat}>
                INQUIRE NOW
              </button>
            </div>
          </div>
          <div className={styles.product_image_container}>
            <div className={styles.image_background_circle}></div>
            <WobblyCircle />
            <LazyLoadImage
              src={Pic}
              alt="Luxury Chronograph Watch"
              className={styles.product_image}
              effect="blur"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default WatchSection;