const playerFields = [
  {
    name: 'name',
    label: 'Nom',
    widget: 'string',
  },
  {
    name: 'club',
    label: 'Club',
    widget: 'string',
  },
  {
    name: 'ranking',
    label: 'Classement',
    widget: 'string',
  },
];

const players = {
  name: 'players',
  label: 'Joueurs',
  label_singular: 'Joueur',
  max: 2,
  min: 1,
  widget: 'list',
  fields: playerFields,
  summary: '{{fields.name}} - {{fields.club}} - {{fields.ranking}}',
};

const setFields = [
  {
    name: 'set',
    label: 'Sets',
    label_singular: 'Set',
    default: [
      [],
      [],
    ],
    max: 3,
    min: 2,
    widget: 'list',
    summary: '{{fields.scoreA}} - {{fields.scoreB}}',
    fields: [
      {
        name: 'scoreA',
        label: 'Score Team A',
        widget: 'number',
        default: 0,
        min: 0,
        max: 30,
      },
      {
        name: 'scoreB',
        label: 'Score Team B',
        widget: 'number',
        default: 0,
        min: 0,
        max: 30,
      },
    ],
  },
];

export default {
  id: 'scoreboard',
  label: 'Scoreboard',
  fields: [
    {
      name: 'matches',
      label: 'Matches',
      label_singular: 'Match',
      widget: 'list',
      fields: [
        {
          name: 'teamA',
          label: 'Team A',
          widget: 'object',
          collapsed: false,
          fields: [players],
        },
        {
          name: 'teamB',
          label: 'Team B',
          widget: 'object',
          collapsed: false,
          fields: [players],
        },
        {
          name: 'score',
          label: 'score',
          widget: 'object',
          collapsed: false,
          fields: setFields,
        },
      ],
    },
  ],
  pattern: /^<scoreboard>(.*?)<\/scoreboard>$/,
  fromBlock: function (match) {
    return JSON.parse(match[1]);
  },
  toBlock: function (obj) {
    return '<scoreboard>' + JSON.stringify(obj) + '</scoreboard>';
  },
  toPreview: function (obj) {
    return obj.url;
  },
};
