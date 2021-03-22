// This file contains various configuration variables used by the frontend.

// TODO: this should probably be an environment variable.
//
// DEVELOPMENT_ENVIRONMENT is pretty self explanatory. For now i'm only planning
// to use it to gate "choose a game at random" behavior.
export const DEVELOPMENT_ENVIRONMENT = true;

// DEVELOPMENT_GAME_ID is a gameId to use for local testing. I'm planning to have
// the application choose a game at random from the DB for the "production" environment.
export const DEVELOPMENT_GAME_ID = "Show #8236 - Monday, September 14, 2020";

// MAX_TIMER_VAL represents the upper bound in seconds for the timer bar on questions.
export const MAX_TIMER_VAL = 20;

export const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const YEARS = [
	"2021",
	"2020",
	"2019",
	"2018",
	"2017",
	"2016",
	"2015",
	"2014",
	"2013",
	"2012",
	"2011",
	"2010",
	"2009",
	"2008",
	"2007",
	"2006",
	"2005",
	"2004",
	"2003",
	"2002",
	"2001",
	"2000",
	"1999",
	"1998",
	"1997",
	"1996",
	"1995",
	"1994",
	"1993",
	"1992",
	"1991",
	"1990",
];
