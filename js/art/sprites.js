/* ============================================================
   16x16 hand-authored sprite grids.

   Every sprite is `{ c: <char -> css colour>, p: [16 rows of 16 chars] }`.
   '.' is transparent. Rows are padded/truncated defensively by the renderer,
   so a miscounted row degrades into a small visual glitch rather than a crash
   (run `validateSprites()` from the console to find them).
   ============================================================ */

const S = (c, p) => ({ c, p });

/* Shared palette fragments keep recolours consistent across sprites. */
const OUTLINE = '#0d1017';
const SKIN    = '#e0a878';
const SKIN_D  = '#b07a4e';

/* ---------------------------------------------------------------
   PLAYER ROLES
   --------------------------------------------------------------- */

export const SPRITES = {

  knight: S({
    o: OUTLINE, m: '#b8c4d4', w: '#e6edf5', n: '#7f8ea6', k: '#4d5b73',
    s: '#1b2330', r: '#c0392b', R: '#7d2018', g: '#f2c14e', b: '#3f6fb5'
  }, [
    '.......rr.......',
    '......rRRr......',
    '.....oooooo.....',
    '....ommwwmmo....',
    '....omwwwwmo....',
    '....okssssko....',
    '....omnnnnmo....',
    '.....onnnno.....',
    '...ogmbbbbmgo...',
    '..wokmbggbmkow..',
    '..wwkmbbbbmkww..',
    '...okmbbbbmko...',
    '....okbbbbko....',
    '....oknnnnko....',
    '....ok.oo.ko....',
    '...okko.okko....',
  ]),

  mage: S({
    o: OUTLINE, p: '#6b4fbf', P: '#4a3288', l: '#9a7ff0', s: SKIN, d: SKIN_D,
    g: '#f2c14e', c: '#5aa9e6', w: '#e6edf5', k: '#2a1f4a'
  }, [
    '.......o........',
    '......opo.......',
    '.....oplpo......',
    '....oplllpo.....',
    '...opllllpo.....',
    '..oPPPPPPPPo....',
    '....osssso......',
    '....odssdo......',
    '...oplsslpo.....',
    '..oplPPPPlpo....',
    '.copllPPllpo....',
    '.cwoplPPlpo.....',
    '..coplPPlpo.....',
    '...oPPPPPPo.....',
    '...oPPPPPPo.....',
    '...ooo..ooo.....',
  ]),

  rogue: S({
    o: OUTLINE, g: '#3d6b4a', G: '#26472f', l: '#5c8f66', s: SKIN, d: SKIN_D,
    k: '#2a2f38', m: '#b8c4d4', r: '#c0392b', y: '#f2c14e'
  }, [
    '................',
    '.....oooooo.....',
    '....oGGGGGGo....',
    '...oGllllllGo...',
    '...oGssssssGo...',
    '...oGykkkkyGo...',
    '....osssssdo....',
    '.....odssdo.....',
    '...ooGGGGGGoo...',
    '..oglGGrrGGlgo..',
    '.moglGGGGGGlgom.',
    'mmoogGGGGGGgoomm',
    '...ooGGGGGGoo...',
    '....oGkkkkGo....',
    '....ok.oo.ko....',
    '...okko.okko....',
  ]),

  cleric: S({
    o: OUTLINE, w: '#f0ead6', W: '#cfc6ac', g: '#f2c14e', s: SKIN, d: SKIN_D,
    b: '#d9c27a', c: '#5aa9e6', k: '#8a7b52'
  }, [
    '................',
    '.....oooooo.....',
    '....owwwwwwo....',
    '...owwggggwwo...',
    '...owssssssWo...',
    '...owsdssdsWo...',
    '....osssssdo....',
    '.....odssdo.....',
    '...oogggggoo....',
    '..owwWggWwwo....',
    '.gowwWWWWwwog...',
    'gg.owWWWWWwo.gg.',
    '...owWWWWWwo....',
    '...owWWWWWwo....',
    '...owwWWWwwo....',
    '...oooooooooo...',
  ]),

  scholar: S({
    o: OUTLINE, b: '#2f5d8a', B: '#1e3d5c', l: '#4a86c0', s: SKIN, d: SKIN_D,
    w: '#e6edf5', g: '#f2c14e', p: '#d9b061', h: '#5a4632'
  }, [
    '................',
    '.....oooooo.....',
    '....ohhhhhho....',
    '...ohhssssho....',
    '...ohsssssso....',
    '...owwosswwo....',  
    '....osssssdo....',
    '.....odssdo.....',
    '...oobbbbboo....',
    '..oblbBBBblbo...',
    '.oblbbBBBbblbo..',
    '.pppobBBBBbo....',
    'pggpobBBBBbo....',
    '.pppobBBBBbo....',
    '...obBBBBBbo....',
    '...oooooooo.....',
  ]),

  warden: S({
    o: OUTLINE, g: '#4a7a52', G: '#2d4d33', l: '#6fd66f', m: '#8a99ad',
    k: '#3a4454', y: '#f2c14e', s: SKIN, d: SKIN_D, w: '#cfe3cf'
  }, [
    '......oooo......',
    '.....oyyyyo.....',
    '....omGGGGmo....',
    '...omGllllGmo...',
    '...omGssssGmo...',
    '...okkssssko....',
    '....osssssdo....',
    '.....odssdo.....',
    '...ommGGGGmmo...',
    '..lomGlllGmol...',
    '.llomGGGGGmoll..',
    'll.okGGGGGko.ll.',
    '...okGGGGGko....',
    '...okkGGGkko....',
    '....ok.oo.ko....',
    '...okko.okko....',
  ])
};

/* ---------------------------------------------------------------
   ENEMIES
   --------------------------------------------------------------- */

Object.assign(SPRITES, {

  rat: S({
    o: OUTLINE, f: '#7a6a58', F: '#5b4d3f', p: '#d98f9e', e: '#d1454b', w: '#e8e4d8'
  }, [
    '................',
    '...oo......oo...',
    '..oppo....oppo..',
    '..oppo.oo.oppo..',
    '...ooofFFfooo...',
    '..offFFFFFFffo..',
    '..offeFFFFeffo..',
    '..offFFFFFFffo..',
    '...offFppFffo...',
    '....owFwwFwo....',
    '...offFFFFffo...',
    '..offFFFFFFffo..',
    '..oFFFFFFFFFFo..',
    'p.oFFFFFFFFFFo..',
    '.poFFoooooFFFo..',
    '...oo..oo..oo...',
  ]),

  slime: S({
    o: OUTLINE, g: '#6fd66f', G: '#3f9a4a', l: '#a8f0a8', e: '#12331a', h: '#d8ffd8'
  }, [
    '................',
    '................',
    '.....oooooo.....',
    '...ooglllgoo....',
    '..oglhhhhlggo...',
    '..oglhhhhlgGo...',
    '.oggleggegllGo..',
    '.oggeeggeeggGo..',
    '.ogggggggggGGo..',
    'ogggggggggggGGo.',
    'oggggggggggGGGo.',
    'oggGgggggGGGGGo.',
    'oGGGGGGGGGGGGGo.',
    '.oGGGGGGGGGGGo..',
    '..oooooooooooo..',
    '................',
  ]),

  ghoul: S({
    o: OUTLINE, g: '#9ab08a', G: '#6b7f5e', e: '#f2c14e', k: '#2b3326', w: '#e8e4d8', r: '#7e1f26'
  }, [
    '................',
    '.....oooooo.....',
    '....oggggggo....',
    '...oggGGGGggo...',
    '...ogeGggGego...',
    '...ogGGggGGgo...',
    '....oGwwwwGo....',
    '....owowowo.....',
    '...ooGGGGGGoo...',
    '..ogGGrrrrGGgo..',
    '.oggGGrrrrGGggo.',
    'og.oGGGGGGGGo.go',
    '....oGGGGGGo....',
    '....oGGooGGo....',
    '....oGo..oGo....',
    '...ooo....ooo...',
  ]),

  bat: S({
    o: OUTLINE, k: '#3a2f44', K: '#241d2c', e: '#d1454b', p: '#8a6f9e', w: '#e8e4d8'
  }, [
    '................',
    '..o..........o..',
    '.okko......okko.',
    'okKKko.oo.okKKko',
    'oKKKKoookkoooKKo',
    'oKKKKokKKKKkoKKo',
    'oKKKKKKeKKeKKKKo',
    'oKKKKKKKKKKKKKKo',
    '.oKKKKKwwwwKKKo.',
    '..oKKKoKwwKoKKo.',
    '...oKKKoooooKo..',
    '....oKKKKKKKo...',
    '.....oKKKKKo....',
    '......oKKKo.....',
    '.......ooo......',
    '................',
  ]),

  cultist: S({
    o: OUTLINE, r: '#8e2f3a', R: '#5c1c24', k: '#1b1b22', y: '#f2c14e', w: '#e8e4d8', p: '#b06fe0'
  }, [
    '......oooo......',
    '.....orrrro.....',
    '....orrrrrro....',
    '...orrkkkkrro...',
    '...orkyookyro...',
    '...orkkkkkkro...',
    '....orrkkrro....',
    '....orrrrrro....',
    '...ooRRRRRRoo...',
    '..pooRRyyRRoop..',
    '.ppoRRRyyRRRopp.',
    'pp.oRRRRRRRRo.pp',
    '...oRRRRRRRRo...',
    '...oRRRRRRRRo...',
    '..oRRRRRRRRRRo..',
    '..oooooooooooo..',
  ]),

  croc: S({
    o: OUTLINE, g: '#4a7a52', G: '#2f5136', l: '#7ab080', e: '#f2c14e', w: '#e8e4d8', b: '#1a2b1e'
  }, [
    '................',
    '................',
    '...oo......oo...',
    '..oeGo....oGeo..',
    '.ooGGoooooGGoo..',
    'oGGGGGGGGGGGGGo.',
    'oGlllGGGGGlllGo.',
    'owowowowowowoGo.',
    'oGGGGGGGGGGGGGo.',
    '.oGGllGGllGGGo..',
    '..oGGGGGGGGGo...',
    '..oGGbGGbGGGo...',
    '.oGGGGGGGGGGGo..',
    'oGGoooGGGoooGGo.',
    '.oo...ooo...oo..',
    '................',
  ]),

  fungus: S({
    o: OUTLINE, r: '#b0485a', R: '#7a2c3c', w: '#e8dbb8', W: '#c9b98d', e: '#2b1b20', p: '#d98f9e'
  }, [
    '................',
    '.....oooooo.....',
    '...oorrrrrroo...',
    '..orrrppprrrro..',
    '.orrrpprrpprrro.',
    'orrRrrrrrrrrRrro',
    'oRRRRRRRRRRRRRRo',
    '.ooowwwwwwwooo..',
    '...owWeWWeWwo...',
    '...owWWWWWWwo...',
    '...owWwwwwWwo...',
    '...owWWWWWWwo...',
    '...owWWWWWWwo...',
    '..oowWWWWWWwoo..',
    '.oWWwwwwwwwwWWo.',
    '.oooooooooooooo.',
  ]),

  wraith: S({
    o: OUTLINE, b: '#3a4f7a', B: '#22304d', c: '#7fb0e0', e: '#9ef0ff', w: '#cfe3f5', k: '#151d2e'
  }, [
    '......oooo......',
    '.....obbbbo.....',
    '....obBBBBbo....',
    '...obBkkkkBbo...',
    '...obBeookeBo...',
    '...obBkkkkkBo...',
    '....obBkkBbo....',
    '....obBBBBbo....',
    '...oobBBBBboo...',
    '..cobBBBBBBboc..',
    '.ccobBBBBBBbocc.',
    'cc.obBBBBBBbo.cc',
    '...ocBBBBBBco...',
    '....ocBBBBco....',
    '.....occBcco....',
    '......oooo......',
  ]),

  crab: S({
    o: OUTLINE, r: '#c0562e', R: '#8a3a1c', l: '#e08a5a', e: '#f2f2f2', k: '#1b1b22'
  }, [
    '................',
    '................',
    '..oo........oo..',
    '.orro......orro.',
    'orRRo.oooo.oRRro',
    'orRRoorrrroorRro',
    '.orRorlllrooRro.',
    '..oorekrkerooo..',
    '..orrrrrrrrrro..',
    '.orRRrrrrrrRRro.',
    '.oRRRRRRRRRRRRo.',
    '.oRRoRRRRRRoRRo.',
    '.ooo.oRRRRo.ooo.',
    '.....oo..oo.....',
    '................',
    '................',
  ]),

  sludge: S({
    o: OUTLINE, g: '#6b7a3a', G: '#44502a', l: '#9ab04a', e: '#f2c14e', k: '#2b3320'
  }, [
    '................',
    '....oo....oo....',
    '...ollo..ollo...',
    '..oglloooollgo..',
    '.oglllggggllglo.',
    '.ogllggggggllgo.',
    'oglegggggggeglgo',
    'ogGggggggggggGgo',
    'ogGGGgkkkkgGGGgo',
    'ogGGGGkkkkGGGGgo',
    'ogGGGGGGGGGGGGgo',
    'oGGGGGGGGGGGGGGo',
    'oGGGoGGGGGGoGGGo',
    '.oGGo.oGGo.oGGo.',
    '..oo...oo...oo..',
    '................',
  ]),

  drowned: S({
    o: OUTLINE, m: '#6d7f8f', M: '#44525e', c: '#4a7a52', e: '#9ef0ff', k: '#1b232b', w: '#b8c4d4'
  }, [
    '.......o........',
    '.....ooooo......',
    '....ommmmmo.....',
    '...omMMMMMmo....',
    '...omMkkkMmo....',
    '...omekkkemo....',
    '....oMkkkMo.....',
    '....ocMMMco.....',
    '...oomMMMmoo....',
    '..wommMMMmmow...',
    '.wwomMMMMMmoww..',
    'ww.oMMMMMMMo.ww.',
    '...oMMcccMMo....',
    '...oMMMMMMMo....',
    '...oMo...oMo....',
    '..ooo.....ooo...',
  ]),

  serpent: S({
    o: OUTLINE, g: '#3f8a6a', G: '#25523f', l: '#6fd6a8', e: '#f2c14e', w: '#e8e4d8'
  }, [
    '................',
    '.....oooo.......',
    '....ogggggo.....',
    '...oglgggglo....',
    '...ogeggggeo....',
    '...oggggggo.....',
    '....owwwwo......',
    '...ooggggoo.....',
    '..ogGGGGGGgo....',
    '.ogGGGGGGGGgo...',
    'ogGGGoooGGGGgo..',
    'oGGGo...oGGGGgo.',
    '.ooo.....oGGGGo.',
    '..........oGGGo.',
    '...........ooo..',
    '................',
  ])
});

/* ---------------------------------------------------------------
   BOSSES (drawn chunkier so they read as a threat at the same size)
   --------------------------------------------------------------- */

Object.assign(SPRITES, {

  boss_ratking: S({
    o: OUTLINE, f: '#8a7460', F: '#5b4d3f', y: '#f2c14e', e: '#d1454b', p: '#d98f9e', w: '#e8e4d8'
  }, [
    '...o..oyo..o....',
    '..oyooyyyooyo...',
    '..oyyyyyyyyyo...',
    '.ooffFFFFFFffoo.',
    '.offFFFFFFFFffo.',
    'offFeFFFFFFeFffo',
    'offFFFFFFFFFFffo',
    '.offFFFppFFFFfo.',
    '..offwFwwFwffo..',
    '..oFFFFFFFFFFo..',
    '.oFFFFFFFFFFFFo.',
    'oFFFFFFFFFFFFFFo',
    'oFFoFFFFFFFFoFFo',
    'ooo.oFFooFFo.ooo',
    '.....oo..oo.....',
    '................',
  ]),

  boss_leviathan: S({
    o: OUTLINE, g: '#4a9a6a', G: '#26523c', l: '#7fe0a8', e: '#f2c14e', w: '#e8e4d8', k: '#122318'
  }, [
    '..oo........oo..',
    '.ollo......ollo.',
    'olGGloooooolGGlo',
    'olGGGgggggggGGlo',
    'oGGGgggggggggGGo',
    'oGGgeGGGGGGGegGo',
    'oGgggGGGGGGGgggo',
    'oGgwGwGwGwGwGwGo',
    'oGGwGwGwGwGwGGGo',
    'oGGGGGGGGGGGGGGo',
    '.oGGkGGGGGGkGGo.',
    '.oGGGGGGGGGGGGo.',
    'oGGGoGGGGGGoGGGo',
    'oGGo..oGGo..oGGo',
    '.oo....oo....oo.',
    '................',
  ]),

  boss_plague: S({
    o: OUTLINE, r: '#a04858', R: '#6b2c38', w: '#e8dbb8', W: '#b8a878', e: '#6fd66f', k: '#2b1b20'
  }, [
    '...oooo..oooo...',
    '..orrrroorrrro..',
    '.orrRRrrrrRRrro.',
    'orrRRRRRRRRRRrro',
    'oRRRRRRRRRRRRRRo',
    '.ooowwwwwwwwooo.',
    '..owWeWWWWeWwo..',
    '..owWWWkkWWWwo..',
    '..owWkkkkkkWwo..',
    '.oowWWWWWWWWwoo.',
    'oewWWWWWWWWWWweo',
    'oeewWWWWWWWWwee.',
    '.oowWWWWWWWWwoo.',
    '..oWWwwwwwwWWo..',
    '.oWWwoooooowWWo.',
    '.oooo......oooo.',
  ]),

  boss_sovereign: S({
    o: OUTLINE, m: '#8a9cb0', M: '#4a5866', y: '#f2c14e', e: '#9ef0ff', c: '#3f8a6a', k: '#151d24'
  }, [
    '..oyo..oo..oyo..',
    '.oyyyooyyooyyyo.',
    '.oyyyyyyyyyyyyo.',
    '..ommmMMMMmmmo..',
    '.ommMMkkkkMMmmo.',
    '.ommMekkkkeMmmo.',
    '..omMkkkkkkMmo..',
    '..ocMMMMMMMMco..',
    '.oommMMMMMMmmoo.',
    'ommmMMMMMMMMmmmo',
    'ommMMMMMMMMMMmmo',
    'oo.oMMMcccMMo.oo',
    '...oMMMMMMMMo...',
    '...oMMo..oMMo...',
    '..ooo.....ooo...',
    '................',
  ]),

  boss_archivist: S({
    o: OUTLINE, p: '#7a4fbf', P: '#4a2f88', l: '#b08ff0', e: '#f2c14e', w: '#e8dbb8', k: '#1b1230'
  }, [
    '.......ee.......',
    '......oeeo......',
    '.....oplllo.....',
    '....opllllpo....',
    '...opPPPPPPpo...',
    '..opPkkkkkkPpo..',
    '..opPkeookekPo..',
    '..opPkkkkkkPpo..',
    '...opPPPPPPpo...',
    '.woopPPPPPPpoow.',
    'wwopPPPPPPPPpoww',
    'wwopPPPPPPPPpoww',
    '.wopPPPPPPPPpow.',
    '..opPPPPPPPPpo..',
    '..oplPPPPPPlpo..',
    '..oooooooooooo..',
  ])
});

/* ---------------------------------------------------------------
   ITEM ICONS
   --------------------------------------------------------------- */

/* One flask silhouette, recoloured per potion type. */
const FLASK = [
  '................',
  '......oooo......',
  '......okko......',
  '......okko......',
  '.....oowwoo.....',
  '....ow.11.wo....',
  '...ow.1111.wo...',
  '...ow.1111.wo...',
  '..ow11111111wo..',
  '..ow12111121wo..',
  '..ow11111111wo..',
  '..ow21111112wo..',
  '..ow22111122wo..',
  '...ow222222wo...',
  '....owwwwwwo....',
  '.....oooooo.....',
];

const flask = (light, dark) => S(
  { o: OUTLINE, k: '#8a6a3a', w: '#cfe0ef', 1: light, 2: dark },
  FLASK,
);

Object.assign(SPRITES, {
  potion_hp:     flask('#e0565c', '#8e2229'),
  potion_energy: flask('#f0a13a', '#a4661a'),
  potion_mana:   flask('#5aa9e6', '#23557f'),
  potion_cure:   flask('#6fd66f', '#2f7a3a'),

  scroll: S({
    o: OUTLINE, p: '#e8dbb8', P: '#c9b98d', k: '#8a6a3a', i: '#3a3020', r: '#c0392b'
  }, [
    '................',
    '..oooooooooooo..',
    '.okkkkkkkkkkkko.',
    '.okPPPPPPPPPPko.',
    '.opppppppppppo..',
    '.opiiiiiiipppo..',
    '.oppppppppppppo.',
    '.opiiiiiiiippo..',
    '.opppppppppppo..',
    '.opiiiiiippppo..',
    '.oppppppppppppo.',
    '.opiiiiiiippo...',
    '.opPPPPPPPPPPko.',
    '.okkkkkkkkkkkko.',
    '..oooorroooooo..',
    '......orro......',
  ]),

  ankh: S({
    o: OUTLINE, g: '#f2c14e', G: '#a97c1d', w: '#fff3c4', c: '#5aa9e6'
  }, [
    '................',
    '.....oooooo.....',
    '....ogwwwwgo....',
    '...ogG....Ggo...',
    '...og......go...',
    '...ogG....Ggo...',
    '....ogwwwwgo....',
    '.....oggggo.....',
    '..ooooogwgooooo.',
    '.ogwwwwgwgwwwgo.',
    '.oGGGGGgwgGGGGo.',
    '..ooooogwgooooo.',
    '.......ogo......',
    '.......ogo......',
    '.......ogo......',
    '......oGGGo.....',
  ]),

  sword: S({
    o: OUTLINE, m: '#d4dce8', n: '#8a99ad', k: '#4d5b73', g: '#f2c14e', h: '#7a5a34'
  }, [
    '.............oo.',
    '............omo.',
    '...........omno.',
    '..........omno..',
    '.........omno...',
    '........omno....',
    '.......omno.....',
    '......omno......',
    '.....omno.......',
    '....omno........',
    '..ogogno........',
    '.oggggo.........',
    'ohggo...........',
    'ohho............',
    'oho.............',
    'oo..............',
  ]),

  shield: S({
    o: OUTLINE, m: '#b8c4d4', n: '#7f8ea6', k: '#4d5b73', g: '#f2c14e', b: '#3f6fb5'
  }, [
    '..oooooooooooo..',
    '.ommmmmmmmmmmmo.',
    '.omnnnnnnnnnnmo.',
    '.omngbbbbbbgnmo.',
    '.omngbbggbbgnmo.',
    '.omngbbggbbgnmo.',
    '.omngbggggbgnmo.',
    '.omngbbggbbgnmo.',
    '..omnbbbbbbnmo..',
    '..omnnbbbbnnmo..',
    '...omnnbbnnmo...',
    '...okmnnnnmko...',
    '....okmnnmko....',
    '.....okmmko.....',
    '......okko......',
    '.......oo.......',
  ]),

  helm: S({
    o: OUTLINE, m: '#b8c4d4', n: '#7f8ea6', k: '#4d5b73', s: '#1b2330', r: '#c0392b'
  }, [
    '................',
    '.......rr.......',
    '......orro......',
    '....oooooooo....',
    '...ommmmmmmmo...',
    '..ommnnnnnnmmo..',
    '..omnssssssnmo..',
    '..omnssssssnmo..',
    '..omnnnnnnnnmo..',
    '..omnsnsnsnsmo..',
    '..omnnnnnnnnmo..',
    '..okmnnnnnnmko..',
    '...okmmmmmmko...',
    '....okkkkkko....',
    '.....oooooo.....',
    '................',
  ]),

  armour: S({
    o: OUTLINE, m: '#b8c4d4', n: '#7f8ea6', k: '#4d5b73', g: '#f2c14e', b: '#3f6fb5'
  }, [
    '................',
    '..oo......oo....',
    '.omno....onmo...',
    'ommnnoooonnmmo..',
    'omnnnmmmmnnnmo..',
    'omnnbbbbbbnnmo..',
    'omnbbbggbbbnmo..',
    'omnbbgggggbnmo..',
    'omnbbbggbbbnmo..',
    'omnnbbbbbbnnmo..',
    '.omnnbbbbnnmo...',
    '.omnnnnnnnnmo...',
    '.okmnnnnnnmko...',
    '..okmmmmmmko....',
    '..oo.oooo.oo....',
    '................',
  ]),

  ring: S({
    o: OUTLINE, g: '#f2c14e', G: '#a97c1d', c: '#5aa9e6', w: '#cfe8ff'
  }, [
    '................',
    '................',
    '......oooo......',
    '.....ocwwco.....',
    '.....ocwwco.....',
    '......oooo......',
    '....oogggoo.....',
    '...ogGGGGGgo....',
    '..ogGo..oGGgo...',
    '..ogGo..oGGgo...',
    '..ogGo..oGGgo...',
    '..ogGGooGGGgo...',
    '...ogGGGGGgo....',
    '....oogggoo.....',
    '......oooo......',
    '................',
  ]),

  amulet: S({
    o: OUTLINE, g: '#f2c14e', G: '#a97c1d', p: '#b06fe0', P: '#6b3f9e', w: '#e8d4ff'
  }, [
    '...oo......oo...',
    '..ogGo....oGgo..',
    '..oGo......oGo..',
    '.ooGo......oGoo.',
    '.oGo........oGo.',
    '.oGo........oGo.',
    '.oGGo......oGGo.',
    '..oGGooooooGGo..',
    '...ooggggggoo...',
    '.....ogppgo.....',
    '....ogpwwpgo....',
    '....ogpwwpgo....',
    '....ogpPPpgo....',
    '.....ogppgo.....',
    '......oggo......',
    '.......oo.......',
  ]),

  gem: S({
    o: OUTLINE, c: '#5aa9e6', C: '#23557f', w: '#d4f0ff', p: '#b06fe0'
  }, [
    '................',
    '.....oooooo.....',
    '....owwccwwo....',
    '...owccccccwo...',
    '..occccccccco...',
    '..occwccccCco...',
    '.oCccccccccCCo..',
    '.oCCcccccccCCo..',
    '..oCCcccccCCo...',
    '..oCCCcccCCCo...',
    '...oCCCcCCCo....',
    '....oCCCCCo.....',
    '.....oCCCo......',
    '......oCo.......',
    '.......o........',
    '................',
  ]),

  bone: S({
    o: OUTLINE, w: '#e8dbb8', W: '#b8a878'
  }, [
    '................',
    '.oo..........oo.',
    'owwo........owwo',
    'owwwo......owwwo',
    '.owwwoooooowwwo.',
    '..owwwwwwwwwwo..',
    '...oWWWWWWWWo...',
    '...oWWWWWWWWo...',
    '..owwwwwwwwwwo..',
    '.owwwoooooowwwo.',
    'owwwo......owwwo',
    'owwo........owwo',
    '.oo..........oo.',
    '................',
    '................',
    '................',
  ]),

  cog: S({
    o: OUTLINE, m: '#8a99ad', n: '#5b6d8a', k: '#3a4454', r: '#8a5a3a'
  }, [
    '................',
    '...oo.oo.oo.....',
    '..ommommommo....',
    '..omnnnnnnmo....',
    'ooomnnnnnnmooo..',
    'ommnnnooonnmmo..',
    'omnnnokkonnnmo..',
    'omnnokkkkonnmo..',
    'omnnokkkkonnmo..',
    'omnnnokkonnnmo..',
    'ommnnnooonnmmo..',
    'ooomnnnnnnmooo..',
    '..omnnnnnnmo....',
    '..ommommommo....',
    '...oo.oo.oo.....',
    '................',
  ]),

  vial: S({
    o: OUTLINE, w: '#cfe0ef', g: '#6fd66f', G: '#2f7a3a', k: '#8a6a3a'
  }, [
    '................',
    '.....oooo.......',
    '.....okko.......',
    '.....owwo.......',
    '.....owwo.......',
    '....oowwoo......',
    '....ow..wo......',
    '...ow.gg.wo.....',
    '...owggggwo.....',
    '...owgGGgwo.....',
    '...owGGGGwo.....',
    '...owGGGGwo.....',
    '....owGGwo......',
    '....owwwwo......',
    '.....oooo.......',
    '................',
  ]),

  dust: S({
    o: OUTLINE, c: '#9ef0ff', C: '#4a86c0', w: '#ffffff'
  }, [
    '.......o........',
    '......owo.......',
    '.o...ocwco...o..',
    'owo..ocwco..owo.',
    '.o..occwccc.o...',
    '....ocwwwco.....',
    '...occwwwcco....',
    '..occCwwwCcco...',
    '..oCCcwwwcCCo...',
    '...oCCcwcCCo....',
    '....oCCcCCo.....',
    '.o...oCCCo...o..',
    'owo...oCo...owo.',
    '.o.....o.....o..',
    '................',
    '................',
  ]),

  key: S({
    o: OUTLINE, g: '#f2c14e', G: '#a97c1d'
  }, [
    '................',
    '.....oooo.......',
    '....oggggo......',
    '...ogGooGgo.....',
    '...ogo..ogo.....',
    '...ogo..ogo.....',
    '...ogGooGgo.....',
    '....oggggo......',
    '.....oggo.......',
    '.....oggo.......',
    '.....oggoo......',
    '.....oggGgo.....',
    '.....oggo.o.....',
    '.....oggoo......',
    '.....oggGgo.....',
    '.....oooooo.....',
  ]),

  bomb: S({
    o: OUTLINE, k: '#2b3038', K: '#14181e', m: '#5b6d8a', r: '#f0a13a', y: '#f2f0a0', h: '#7a5a34'
  }, [
    '.............y..',
    '............yry.',
    '...........yry..',
    '..........oho...',
    '.........oho....',
    '.......ohho.....',
    '.....ooooo......',
    '...ookkkkoo.....',
    '..okmkkkkkko....',
    '.okmkkkkkkkko...',
    '.okkkkkkkkKko...',
    '.okkkkkkkkKko...',
    '.oKkkkkkkKKko...',
    '..oKKkkkKKko....',
    '...ooKKKKoo.....',
    '.....oooo.......',
  ]),

  book: S({
    o: OUTLINE, b: '#2f5d8a', B: '#1e3d5c', p: '#e8dbb8', P: '#c9b98d', g: '#f2c14e'
  }, [
    '................',
    '..oooooooooooo..',
    '.obbbbbbbbbbbbo.',
    '.obBBBBBBBBBBbo.',
    '.obBpppppppPBbo.',
    '.obBpggggggpBbo.',
    '.obBpppppppPBbo.',
    '.obBpPPPPPPpBbo.',
    '.obBpppppppPBbo.',
    '.obBpPPPPPPpBbo.',
    '.obBpppppppPBbo.',
    '.obBBBBBBBBBBbo.',
    '.obbbbbbbbbbbbo.',
    '..oooooooooooo..',
    '................',
    '................',
  ]),

  shroom: S({
    o: OUTLINE, r: '#b0485a', R: '#7a2c3c', w: '#e8dbb8', W: '#c9b98d', p: '#d98f9e'
  }, [
    '................',
    '................',
    '.....oooooo.....',
    '...oorrrrrroo...',
    '..orrppprrpro...',
    '.orrrrrrrrrrro..',
    '.oRRrrrrrrrRRo..',
    '.oRRRRRRRRRRRo..',
    '..ooowwwwwooo...',
    '....owWWWwo.....',
    '....owWWWwo.....',
    '....owWWWwo.....',
    '....owWWWwo.....',
    '...oowwwwwoo....',
    '...oooooooo.....',
    '................',
  ]),

  tail: S({
    o: OUTLINE, p: '#d98f9e', P: '#a5606f'
  }, [
    '................',
    '..........oooo..',
    '.........oppppo.',
    '........oppPPpo.',
    '.......oppPo.oo.',
    '......oppPo.....',
    '.....oppPo......',
    '....oppPo.......',
    '...oppPo........',
    '..oppPo.........',
    '..opPo..........',
    '.oppo...........',
    '.opo............',
    'oPo.............',
    'oo..............',
    '................',
  ]),

  blueprint: S({
    o: OUTLINE, b: '#23557f', c: '#5aa9e6', w: '#d4f0ff'
  }, [
    '................',
    '.oooooooooooooo.',
    '.obbbbbbbbbbbbo.',
    '.obwwwwbbbbbbbo.',
    '.obwbbwbbwwwwbo.',
    '.obwbbwbbwbbwbo.',
    '.obwwwwbbwbbwbo.',
    '.obbbbbbbwwwwbo.',
    '.obcccbbbbbbbbo.',
    '.obbbbbbbccccco.',
    '.obwwwwwbbbbbbo.',
    '.obbbbbbbbwwwwo.',
    '.obbbbbbbbbbbbo.',
    '.oooooooooooooo.',
    '................',
    '................',
  ])
});

/* ---------------------------------------------------------------
   DUNGEON TILES
   --------------------------------------------------------------- */

Object.assign(SPRITES, {

  floor: S({ a: '#2a3038', b: '#232a31', c: '#333b45', o: '#1a1f25' }, [
    'oooooooooooooooo',
    'obbbbbbbobbbbbbo',
    'obccccbbobbccccb',
    'obccccbbobbccccb',
    'obbbbbbbobbbbbbb',
    'obbbbbbbobbbbbbb',
    'oooooooooooooooo',
    'obbbbbbobbbbbbbo',
    'obbccccbobbccccb',
    'obbccccbobbccccb',
    'obbbbbbbobbbbbbb',
    'obbbbbbbobbbbbbb',
    'oooooooooooooooo',
    'obbbbbbbobbbbbbo',
    'obbbbbbbobbbbbbo',
    'obbbbbbbobbbbbbo',
  ]),

  floor_moss: S({ a: '#2a3038', b: '#232a31', g: '#33452f', G: '#405a38', o: '#1a1f25' }, [
    'oooooooooooooooo',
    'obbbbbbbobbGgbbo',
    'obbbbbbbobGGGgbb',
    'obggbbbbobbGgbbb',
    'obGGgbbbobbbbbbb',
    'obgGbbbbobbbbbbb',
    'oooooooooooooooo',
    'obbbbbbobbbbbggb',
    'obbbbbbbobbbgGGb',
    'obbbbbbbobbbbggb',
    'obbggbbbobbbbbbb',
    'obbGGbbbobbbbbbb',
    'oooooooooooooooo',
    'obbgbbbbobbbbbbo',
    'obbbbbbbobbbggbo',
    'obbbbbbbobbbbbbo',
  ]),

  floor_crack: S({ a: '#2a3038', b: '#232a31', k: '#14181d', o: '#1a1f25' }, [
    'oooooooooooooooo',
    'obbbbbkbobbbbbbo',
    'obbbbkbbobbbbbbb',
    'obbbkbbbobbbbkbb',
    'obbkbbbbobbbkbbb',
    'obkbbbbbobbkbbbb',
    'ooooooooooooooko',
    'obbbbbbobkbbbbbo',
    'obbbbbbbokbbbbbb',
    'obbbbbbbobkbbbbb',
    'obbbbbbbobbkbbbb',
    'obbbbbbbobbbkbbb',
    'oooooooooooooooo',
    'obbbbbbbobbbbbbo',
    'obbbbbbbobbbbbbo',
    'obbbbbbbobbbbbbo',
  ]),

  wall: S({ a: '#3d4652', b: '#333b45', c: '#4a5563', o: '#171c22', d: '#262d35' }, [
    'oooooooooooooooo',
    'occcccccccccccco',
    'obaaaaaaobaaaaao',
    'obaaaaaaobaaaaao',
    'obaaaaaaobaaaaao',
    'odddddddoddddddo',
    'oooooooooooooooo',
    'occccccoccccccco',
    'obaaaaaobaaaaaao',
    'obaaaaaobaaaaaao',
    'obaaaaaobaaaaaao',
    'oddddddodddddddo',
    'oooooooooooooooo',
    'occccccccccccccc',
    'obaaaaaaobaaaaao',
    'obaaaaaaobaaaaao',
  ]),

  wall_pipe: S({ a: '#3d4652', b: '#333b45', m: '#5b6d8a', n: '#3a4454', o: '#171c22', r: '#6b4a30' }, [
    'oooooooooooooooo',
    'obaaaaaaobaaaaao',
    'obaaaaaaobaaaaao',
    'oaaaaaaaaaaaaaao',
    'ommmmmmmmmmmmmmo',
    'onnnnnnnnnnnnnno',
    'ormmmmmmmmmmmmro',
    'onnnnnnnnnnnnnno',
    'ommmmmmmmmmmmmmo',
    'oooooooooooooooo',
    'obaaaaaobaaaaaao',
    'obaaaaaobaaaaaao',
    'oooooooooooooooo',
    'obaaaaaaobaaaaao',
    'obaaaaaaobaaaaao',
    'oooooooooooooooo',
  ]),

  water: S({ w: '#1e3a4a', W: '#162c39', l: '#2d5468', h: '#3f7288' }, [
    'WWWWWWWWWWWWWWWW',
    'WwwwwwwwwwwwwwwW',
    'WwwlllwwwwwwwwwW',
    'WwwwwwwwwwlllwwW',
    'WwwwwwwwwwwwwwwW',
    'WwlllwwwwwwwwwwW',
    'WwwwwwwwwlllwwwW',
    'WwwwwwwwwwwwwwwW',
    'WwwwwwlllwwwwwwW',
    'WwwwwwwwwwwwwwwW',
    'WwwwlllwwwwwlllW',
    'WwwwwwwwwwwwwwwW',
    'WwwwwwwwlllwwwwW',
    'WwwwwwwwwwwwwwwW',
    'WwwlllwwwwwwwwwW',
    'WWWWWWWWWWWWWWWW',
  ]),

  grate: S({ o: '#14181d', m: '#4a5563', n: '#2b323b', k: '#0d1014' }, [
    'oooooooooooooooo',
    'ommmmmmmmmmmmmmo',
    'omkkomkkomkkomko',
    'omkkomkkomkkomko',
    'ommmmmmmmmmmmmmo',
    'omkkomkkomkkomko',
    'omkkomkkomkkomko',
    'ommmmmmmmmmmmmmo',
    'omkkomkkomkkomko',
    'omkkomkkomkkomko',
    'ommmmmmmmmmmmmmo',
    'omkkomkkomkkomko',
    'omkkomkkomkkomko',
    'ommmmmmmmmmmmmmo',
    'onnnnnnnnnnnnnno',
    'oooooooooooooooo',
  ]),

  chest: S({ o: '#14181d', h: '#7a5a34', H: '#543a20', g: '#f2c14e', G: '#a97c1d', k: '#2b1b0e' }, [
    '................',
    '................',
    '...oooooooooo...',
    '..oghhhhhhhhgo..',
    '..oghHHHHHHhgo..',
    '..oghHHHHHHhgo..',
    '..ogggggggggggo.',
    '..oGGGGGGGGGGGo.',
    '..ohhhhkkhhhhho.',
    '..ohHHhggkhHHho.',
    '..ohHHhggkhHHho.',
    '..ohHHHHkkHHHho.',
    '..ohHHHHHHHHHho.',
    '..oGGGGGGGGGGGo.',
    '..oooooooooooo..',
    '................',
  ]),

  chest_open: S({ o: '#14181d', h: '#7a5a34', H: '#543a20', g: '#f2c14e', G: '#a97c1d', w: '#fff3c4' }, [
    '...oooooooooo...',
    '..oghhhhhhhhgo..',
    '..oghHHHHHHhgo..',
    '..ooooooooooooo.',
    '....wgwgwgwgw...',
    '...wgwgwgwgwgw..',
    '..oggggggggggo..',
    '..oGgwgwgwgwGo..',
    '..ohHHHHHHHHho..',
    '..ohHHHHHHHHho..',
    '..ohHHHHHHHHho..',
    '..oGGGGGGGGGGo..',
    '..oooooooooooo..',
    '................',
    '................',
    '................',
  ]),

  stairs: S({ o: '#14181d', a: '#3d4652', b: '#2a3038', k: '#0a0d10' }, [
    'oooooooooooooooo',
    'okkkkkkkkkkkkkko',
    'okkkkkkkkkkkkkko',
    'oaaaaaaaaaaaaaao',
    'obbbbbbbbbbbbbbo',
    'okkkkkkkkkkkkkko',
    'o.aaaaaaaaaaaa.o',
    'o.bbbbbbbbbbbb.o',
    'ookkkkkkkkkkkkoo',
    '..oaaaaaaaaaao..',
    '..obbbbbbbbbbo..',
    '..ookkkkkkkkoo..',
    '....oaaaaaao....',
    '....obbbbbbo....',
    '....oooooooo....',
    '................',
  ]),

  door: S({ o: '#14181d', h: '#5a3f24', H: '#3d2a17', m: '#7f8ea6', g: '#f2c14e' }, [
    'oooooooooooooooo',
    'ohhhhhhhhhhhhhho',
    'ohHHHHHHHHHHHHho',
    'ohHhhhhhhhhhhHho',
    'ohHhHHHHHHHHhHho',
    'ohHhHmmmmmmHhHho',
    'ohHhHmHHHHmHhHho',
    'ohHhHmHggHmHhHho',
    'ohHhHmHggHmHhHho',
    'ohHhHmHHHHmHhHho',
    'ohHhHmmmmmmHhHho',
    'ohHhHHHHHHHHhHho',
    'ohHhhhhhhhhhhHho',
    'ohHHHHHHHHHHHHho',
    'ohhhhhhhhhhhhhho',
    'oooooooooooooooo',
  ]),

  torch: S({ o: '#14181d', a: '#3d4652', h: '#5a3f24', y: '#ffe066', r: '#f0a13a', w: '#fff8d0' }, [
    'oooooooooooooooo',
    'oaaaaaaaaaaaaaao',
    'oaaaaa.y.aaaaaao',
    'oaaaa.yry.aaaaao',
    'oaaa.yrwry.aaaao',
    'oaaa.yrwry.aaaao',
    'oaaaa.yry.aaaaao',
    'oaaaaa.y.aaaaaao',
    'oaaaaohhoaaaaaao',
    'oaaaaohhoaaaaaao',
    'oaaaaohhoaaaaaao',
    'oaaaaoooaaaaaaao',
    'oaaaaaaaaaaaaaao',
    'oaaaaaaaaaaaaaao',
    'oaaaaaaaaaaaaaao',
    'oooooooooooooooo',
  ]),

  rubble: S({ o: '#14181d', a: '#3d4652', b: '#2a3038', c: '#4a5563' }, [
    '................',
    '................',
    '.....oooo.......',
    '....ocaaco......',
    '...oaabbao..oo..',
    '...oabbbao.ocao.',
    '..ooabbaoo.oabo.',
    '.ocaoaaooo.ooo..',
    '.oabbaocao......',
    '.oabbboabo..oo..',
    '.ooabboooo.ocao.',
    '..ooaaoo...oabo.',
    '...oooo.....ooo.',
    '................',
    '................',
    '................',
  ]),

  bones: S({ o: '#14181d', w: '#c9bda0', W: '#8f8570' }, [
    '................',
    '................',
    '.....oooo.......',
    '....owwwwo......',
    '...owWooWwo.....',
    '...owWWWWwo.....',
    '....owWWwo......',
    '.....oooo.......',
    '.ooo.......ooo..',
    'owwwooooooowwwo.',
    '.oWWWWWWWWWWWo..',
    'owwwooooooowwwo.',
    '.ooo.......ooo..',
    '................',
    '................',
    '................',
  ]),

  altar: S({ o: '#14181d', m: '#8a99ad', n: '#5b6d8a', c: '#5aa9e6', w: '#d4f0ff', g: '#f2c14e' }, [
    '................',
    '.......cc.......',
    '......cwwc......',
    '.....cwwwwc.....',
    '......cwwc......',
    '.......cc.......',
    '..oooooooooooo..',
    '..ommmmmmmmmmo..',
    '..onnnnnnnnnno..',
    '...ommgmmgmmo...',
    '...onnnnnnnno...',
    '...ommmmmmmmo...',
    '..ommmmmmmmmmo..',
    '..onnnnnnnnnno..',
    '..oooooooooooo..',
    '................',
  ])
});
