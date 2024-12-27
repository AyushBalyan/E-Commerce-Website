import React from 'react';
import styles from './SneakerHero.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import WobblyCircle from '../WobblyCircle';
import Pic from "/Users/lkbalyan/Desktop/Ayush/UNDS Website/frontend/src/assets/SneakerHero.png"

const SneakerHero = () => {

  const handleClickToChat = () => {
    const instagramUsername = "unds.in";
    //const message = encodeURIComponent(`Hi, I'm interested in the ${sneaker.name}, size ${selectedSize}. Can you provide more information?`);

    const instagramAppUrl = `instagram://user?username=${instagramUsername}`;

    // Try to open the Instagram app
    window.location.href = instagramAppUrl;

    // Check if the app was successfully opened
    setTimeout(() => {
      // If the page is still active, it means the app wasn't opened
      if (document.hidden === false) {
        // Fallback to opening the web version
        window.open(`https://ig.me/m/${instagramUsername}`, "_blank");
      }
    }, 2000);
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.nike_container}>
        <main className={styles.main_content}>
          <div className={styles.product_image_container}>
            <WobblyCircle />
            <LazyLoadImage
              src={Pic}
              alt="Nike Air Jordan 1 Retro High OG University Blue"
              className={styles.product_image}
              effect="blur"
            />
          </div>
          <div className={styles.product_info}>
            <h1 className={styles.product_title}>NIKE AJ1 RETRO HIGH</h1>
            <h2 className={styles.product_subtitle}>OG LOST & FOUND</h2>
            <p className={styles.product_description}>
              Experience the iconic style and unmatched comfort of the Nike AJ1 High Union Los Angeles. 
              This legendary sneaker combines classic design with modern performance features.
            </p>
            <div className={styles.price_info}>
              <span className={styles.price} aria-label="Price">$1,595</span>
              <button className={styles.chat_button} aria-label="Click to Chat" onClick={handleClickToChat}>INQUIRE NOW</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SneakerHero;