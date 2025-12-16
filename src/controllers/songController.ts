import type { Request, Response } from "express";
import Song from "../models/Song.js";
import type { ISong } from "../models/Song.js";

// Create song
export const createSong = async (req: Request, res: Response) => {
  try {
    const song: ISong = new Song(req.body);
    const savedSong = await song.save();
    res.status(201).json(savedSong);
  } catch (error) {
    res.status(500).json({ message: "Error creating song", error });
  }
};

// Get all songs
export const getSongs = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs", error });
  }
};

// Update song
export const updateSong = async (req: Request, res: Response) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSong) return res.status(404).json({ message: "Song not found" });
    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(500).json({ message: "Error updating song", error });
  }
};

// Delete song
export const deleteSong = async (req: Request, res: Response) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (!deletedSong) return res.status(404).json({ message: "Song not found" });
    res.status(200).json({ message: "Song deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting song", error });
  }
};

// Statistics
export const getStats = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find();

    const totalSongs = songs.length;
    const totalArtists = new Set(songs.map(s => s.artist)).size;
    const totalAlbums = new Set(songs.map(s => s.album)).size;
    const genres = Array.from(new Set(songs.map(s => s.genre))).map(genre => ({
      genre,
      count: songs.filter(s => s.genre === genre).length,
    }));

    res.status(200).json({ totalSongs, totalArtists, totalAlbums, genres });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
};
