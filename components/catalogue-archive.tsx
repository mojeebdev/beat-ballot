"use client";

import { useState } from "react";
import { songs, type Artist } from "@/data/ballot";

export function CatalogueArchive() {
  const [artist, setArtist] = useState<Artist | "All">("All");
  const [era, setEra] = useState("All");
  const eras = [...new Set(songs.map((song) => `${Math.floor(song.year / 5) * 5}`))].sort();
  const records = songs.filter((song) => (
    (artist === "All" || song.artist === artist)
    && (era === "All" || `${Math.floor(song.year / 5) * 5}` === era)
  ));

  return (
    <>
      <div className="archive-controls" aria-label="Catalogue filters">
        <label>ARTIST
          <select value={artist} onChange={(event) => setArtist(event.target.value as Artist | "All")}>
            <option value="All">All artists</option>
            <option value="Olamide">Olamide</option>
            <option value="Davido">Davido</option>
            <option value="Neutral">Neutral</option>
          </select>
        </label>
        <label>ERA
          <select value={era} onChange={(event) => setEra(event.target.value)}>
            <option value="All">All eras</option>
            {eras.map((value) => <option key={value} value={value}>{value}–{Number(value) + 4}</option>)}
          </select>
        </label>
        <span>{records.length} RECORDS FILED</span>
      </div>
      <ol className="archive-records">
        {records.map((song, index) => (
          <li key={song.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <time dateTime={`${song.year}`}>{song.year}</time>
            <div>
              <h2>{song.title}</h2>
              <p>{song.artist} / {song.role} / {song.evidenceLevel}</p>
              <small>{song.milestone}</small>
            </div>
            <a href={song.source.url} target="_blank" rel="noreferrer">SOURCE ↗</a>
          </li>
        ))}
      </ol>
    </>
  );
}
