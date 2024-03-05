const fs = require('fs');
const express = require('express')
const router = express.Router();

import { Request, Response } from "express";
import axios from "axios";

import nlp from 'compromise';
import plg from 'compromise-speech';
import * as  cheerio from "cheerio";
import Three from "compromise/types/view/three";

/* nlp.extend(plg); extends the nlp object from the compromise library with speech-related functionalities provided by the compromise-speech plugin (plg). */
nlp.extend(plg);
const baseUrl: string = 'https://randomword.com';

/**
 * Represents the type for the word of the day.
 * @typedef {Object} WordOfTheDayType
 * @property {string} word - The word of the day.
 * @property {string} definition - The definition of the word.
 * @property {string} pronunciation - The pronunciation of the word.
 */
type WordOfTheDayType = {
    word: string,
    definition: string,
    pronunciation: string
}

/**
 * Represents the word of the day.
 */
let wordOfTheDay: WordOfTheDayType = {
    word: '',
    definition: '',
    pronunciation: ''
};

/**
 * Pronounces the given word.
 * @param word - The word to be pronounced.
 * @returns The pronunciation of the word, or 'No Pronunciation Found' if not available.
 */
const pronounceWord = (word: string): string => {
    let doc: Three = nlp(word);
    // @ts-ignore
    return doc.soundsLike() || 'No Pronunciation Found';
}

/**
 * Writes the given word to the 'words.json' file.
 * @param _word The word to be written to the file.
 */
const writeToFile = (_word: WordOfTheDayType) => {
    fs.readFile('words.json', (err: any, data: string) => {
        if (err) { console.error(err); }
        const words = JSON.parse(data);
        words.push(wordOfTheDay);

        fs.writeFile('words.json', JSON.stringify(words), (err: any) => {
            if (err) { console.error(err); }
        });
    });
}

/**
 * Handles the GET request for the word of the day.
 * @param _req - The request object.
 * @param res - The response object.
 */
router.get('/', (_req: Request, res: Response) => {
    axios({
        method: "GET",
        url: baseUrl,
    }).then((response) => {
        const $ = cheerio.load(response.data);
        let wordSection: cheerio.Cheerio<cheerio.Element> = $(".section #shared_section");
        let word: string = wordSection
            .find("#random_word")
            .eq(0)
            .text().trim();
        let definition = wordSection
            .find("#random_word_definition")
            .eq(0)
            .text().trim();
        writeToFile(wordOfTheDay);
        wordOfTheDay = { word, definition, pronunciation: pronounceWord(word)[0].toString() };
        res.send(wordOfTheDay);
    }).catch((error) => {
        console.error(error);
        wordOfTheDay = { word: 'Error', definition: error, pronunciation: 'An error occurred' };
        res.send(wordOfTheDay);
    });
});

export default router;