-[x] 4 x 12 instead of 5 x 10
~~-[ ] color legend~~
-[x] game colored chips
-[x] make divs scroll down properly on addition of info.
-[x] click questions to shuffle
-[x] preferences (handle no tiles case gracefully, etc)
-[x] preferences (save)
    - ~~[wontfix] inserting into custom tile order moves cursor to the end
        (won't fix for now)~~
-[x] preferences dialog
    - [x] hide lexicon symbols
    - [x] close on save
    - [x] reset on close
-[x] make tiles smaller for longer words
-[x] spanish digraph tiles
    - [x] guess/display logic
~~-[ ] i18n
    - This is difficult. https://github.com/yahoo/react-intl is a good package but I'd need to move to nodejs/babel/es6/etc and change a lot of stuff. I may temporarily remove i18n since there's only one Spanish user.~~
-[x] shuffle/alpha/etc
-[x] solutions
    -[x] mark missed
-[x] submit guess if not solved locally
-[x] end game properly when all words solved/time runs out
    - [x] start at end of game should not start timer/show giveup button.
-[x] save behavior
    - [x] save at the very end of a round if the user forgot to click autosave
-[x] exit table
    -[x] exit behavior (auto give up if quiz going, etc.)
-[x] visual rearrangement
-[x] FIREFOX SUCKS
    - [x] Tiles not centering
    - [x] Backspace should not go back
-[x] > 100% solved sometimes (35/31 ?)
    happens when you click start after going through a set of questions
-[x] daily challenge results
-[x] guess error behavior
-[x] compilation/deployment on dev
    - [x] webpack, etc. require doesn't seem to work (maybe that's good and will force me to figure it out)
    - [x] Probably turn everything into ES6 / remove require... ;(
-[x] optimization (don't handle unseen elements, etc)
    - [x] check on slower computers (my old macbook) --- it's pretty fast on Chromebits!
-[x] autofocus guess on start
-[x] Search for XXX/TODO/etc.
-[x] ran out of time too early bug :(
    -  Pretty sure this has to do with bringing computer back from sleep and
    starting game too soon afterwards.
-[x] tests (this one can be neverending, but some tests are ok, can always add more)
    - need to learn React tests.
Minor tweaks:
-[x] Disable start briefly after pressing start.
~~-[ ] click to show solutions? (if users were in the middle of typing)~~
-[x] Move X button somewhere nicer, maybe move a couple other things
    - [x] autosave, list display length, etc.
-[x] Use bootstrap icons instead of font awesome.
-[x] As window shrinks UserBox should disappear or move elsewhere.

Nice to haves:

    - need to learn how to write front end tests.
-[ ] on hover things
    - show alphagrams solved, number of alphagrams, etc
    - show definitions for words.
    - (how do we get tooltips to work?)
-[ ] as user types, dim tiles


(Can release part 1)

For multiplayer
-[ ] More player boxes (only show on bigger screens?)
-[ ] Chat submit box
-[ ] Hijack tab key to change between guess/chat
-[ ] All the relevant multiplayer logic