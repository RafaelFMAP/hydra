import { useNavigate } from "react-router-dom";
import { AsyncImage } from "@renderer/components";
import * as styles from "./hero.css";
import { useEffect, useState } from "react";
import { ShopDetails } from "@types";
import { getSteamLanguage, steamUrlBuilder } from "@renderer/helpers";
import { useTranslation } from "react-i18next";

const FEATURED_GAME_ID = "1144200";

export function Hero() {
  const [featuredGameDetails, setFeaturedGameDetails] =
    useState<ShopDetails | null>(null);

  const { i18n } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    window.electron
      .getGameShopDetails(
        FEATURED_GAME_ID,
        "steam",
        getSteamLanguage(i18n.language)
      )
      .then((result) => {
        setFeaturedGameDetails(result);
      });
  }, [i18n.language]);

  return (
    <button
      type="button"
      onClick={() => navigate("/game/steam/1144200")}
      className={styles.hero}
    >
      <div className={styles.backdrop}>
        <AsyncImage
          src={steamUrlBuilder.libraryHero(FEATURED_GAME_ID)}
          alt={featuredGameDetails?.name}
          className={styles.heroMedia}
        />

        <div className={styles.content}>
          <AsyncImage
            src={steamUrlBuilder.logo(FEATURED_GAME_ID)}
            width="250px"
            alt={featuredGameDetails?.name}
            style={{ marginBottom: 16 }}
          />

          <p className={styles.description}>
            {featuredGameDetails?.short_description}
          </p>
        </div>
      </div>
    </button>
  );
}
