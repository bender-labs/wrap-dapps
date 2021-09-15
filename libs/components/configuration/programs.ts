import { Environment, ProgramConfig } from './types';
import { WRAP_TOKEN_GRANADA_TESTNET, WRAP_TOKEN_MAINNET } from './WrapTokens';

export const programs: { [key in Environment]: ProgramConfig[] } = {
  MAINNET: [
    {
      reward: WRAP_TOKEN_MAINNET,
      farmingContract: 'KT1QY4siBbWg9qpj52fEzrWdWfkbFcwwjfoA',
      pool: {
        contract: 'KT1FG63hhFtMEEEtmBSX2vuFmP87t9E7Ab4t',
        base: WRAP_TOKEN_MAINNET,
        quote: 'xtz'
      }
    },
    {
      reward: WRAP_TOKEN_MAINNET,
      farmingContract: 'KT1NvQJYeMCdEtzF45bs3UNpMmjfY97u2qW2',
      pool: {
        contract: 'KT1Lvtxpg4MiT2Bs38XGxwh3LGi5MkCENp4v',
        base: {
          symbol: 'wAAVE',
          name: 'Wrapped AAVE',
          tokenId: 0,
          contractAddress: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
          thumbnailUri:
            'ipfs://QmVUVanUUjHmgkjnUC6TVzG7pPz6iy7C8tnAoXNNpofYPg',
          decimals: 18
        },
        quote: 'xtz'
      }
    },
    {
      reward: WRAP_TOKEN_MAINNET,
      farmingContract: 'KT1D3fEH94HkKkNdr5Wi5FaXB9k5AHHGjhuj',
      pool: {
        contract: 'KT1UMAE2PBskeQayP5f2ZbGiVYF7h8bZ2gyp',
        base: {
          symbol: 'wBUSD',
          name: 'Wrapped BUSD',
          tokenId: 1,
          contractAddress: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
          thumbnailUri:
            'ipfs://QmRB63vb8ThpmxHKF4An3XD8unHyCUuLYm5bZNhXwU4gAZ',
          decimals: 18
        },
        quote: 'xtz'
      }
    },
    {
      reward: WRAP_TOKEN_MAINNET,
      farmingContract: 'KT1EuvFwncr6z4hDVKAsqHuu9XXis9Zd8CqZ',
      pool: {
        contract: 'KT1PQ8TMzGMfViRq4tCMFKD2QF5zwJnY67Xn',
        base: {
          symbol: 'wDAI',
          name: 'Wrapped DAI',
          tokenId: 5,
          contractAddress: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
          thumbnailUri:
            'ipfs://QmVov6RtfRNzuQGvGKmhnABUsfCiDKvn31amg8DUxzowtM',
          decimals: 18
        },
        quote: 'xtz'
      }
    },
    {
      reward: WRAP_TOKEN_MAINNET,
      farmingContract: 'KT1T9zQKY259fbCt6tKHFnrMHEePgmsWAJYW',
      pool: {
        contract: 'KT1Lpysr4nzcFegC9ci9kjoqVidwoanEmJWt',
        base: {
          symbol: 'wLINK',
          name: 'Wrapped LINK',
          tokenId: 10,
          contractAddress: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
          thumbnailUri:
            'ipfs://QmeaRuB578Xgy8jxbTxqmQ9s5wyioAEP85V7qbJFnn2uT8',
          decimals: 18
        },
        quote: 'xtz'
      }
    },
    {
      reward: WRAP_TOKEN_MAINNET,
      farmingContract: 'KT1NodPMkSmMvLcaggUCGh5nx6aqYcYtyz5j',
      pool: {
        contract: 'KT1RsfuBee5o7GtYrdB7bzQ1M6oVgyBnxY4S',
        base: {
          symbol: 'wMATIC',
          name: 'Wrapped MATIC',
          tokenId: 11,
          contractAddress: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
          thumbnailUri:
            'ipfs://QmchBnjRjpweznHes7bVKHwgzd8D6Q7Yzwf6KmA4KS6Dgi',
          decimals: 18
        },
        quote: 'xtz'
      }
    },
    {
      reward: WRAP_TOKEN_MAINNET,
      farmingContract: 'KT1Tni1sb5kVgCg2qMWJ2YPyUpDLFVg8RCbF',
      pool: {
        contract: 'KT1Ca5FGSeFLH3ugstc5p56gJDMPeraBcDqE',
        base: {
          symbol: 'wPAX',
          name: 'Wrapped PAX',
          tokenId: 14,
          contractAddress: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
          thumbnailUri:
            'ipfs://QmZD5QDAeAUyyLYKiMmxD4vfWpVeYHctcbTkPmo4NudDHt',
          decimals: 18
        },
        quote: 'xtz'
      }
    },
    {
      reward: WRAP_TOKEN_MAINNET,
      farmingContract: 'KT1HjYtzsDHvN59hhTrFVZb9Ugg3xMPaWg33',
      pool: {
        contract: 'KT1Ti3nJT85vNn81Dy5VyNzgufkAorUoZ96q',
        base: {
          symbol: 'wUNI',
          name: 'Wrapped UNI',
          tokenId: 16,
          contractAddress: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
          thumbnailUri:
            'ipfs://QmQBezdVvotCGnFHgQNKduLdxEJhfgruSEqtwnWY7mESb2',
          decimals: 18
        },
        quote: 'xtz'
      }
    },
    {
      reward: WRAP_TOKEN_MAINNET,
      farmingContract: 'KT1LWf77r8tn9GFsMffFV8n8XrBMbL8G9avv',
      pool: {
        contract: 'KT1U2hs5eNdeCpHouAvQXGMzGFGJowbhjqmo',
        base: {
          symbol: 'wUSDC',
          name: 'Wrapped USDC',
          tokenId: 17,
          contractAddress: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
          thumbnailUri:
            'ipfs://QmQfHU9mYLRDU4yh2ihm3zrvVFxDrLPiXNYtMovUQE2S2t',
          decimals: 6
        },
        quote: 'xtz'
      }
    },
    {
      reward: WRAP_TOKEN_MAINNET,
      farmingContract: 'KT1B36N9Me7hjfrVsJHsu9cA3FkNWAfAkJ6m',
      pool: {
        contract: 'KT1T4pfr6NL8dUiz8ibesjEvH2Ne3k6AuXgn',
        base: {
          symbol: 'wUSDT',
          name: 'Wrapped USDT',
          tokenId: 18,
          contractAddress: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
          thumbnailUri:
            'ipfs://QmVbiHa37pe2U9FfXBYfvrLNpb38rbXwaN19HwZD2speFA',
          decimals: 6
        },
        quote: 'xtz'
      }
    },
    {
      reward: WRAP_TOKEN_MAINNET,
      farmingContract: 'KT1AxiZu1CtCMg5g5YiPL145cDx9axdwAexX',
      pool: {
        contract: 'KT1DksKXvCBJN7Mw6frGj6y6F3CbABWZVpj1',
        base: {
          symbol: 'wWBTC',
          name: 'Wrapped WBTC',
          tokenId: 19,
          contractAddress: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
          thumbnailUri:
            'ipfs://Qmdj6n9T48LDWex8NkBMKUQJfZgardxZVdtRRibYQVzLCJ',
          decimals: 8
        },
        quote: 'xtz'
      }
    },
    {
      reward: WRAP_TOKEN_MAINNET,
      farmingContract: 'KT1BN1Si6u8ndd46RbbES5cNGojyRK6T8Md8',
      pool: {
        contract: 'KT1DuYujxrmgepwSDHtADthhKBje9BosUs1w',
        base: {
          symbol: 'wWETH',
          name: 'Wrapped WETH',
          tokenId: 20,
          contractAddress: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
          thumbnailUri:
            'ipfs://Qmezz1ztvo5JFshHupBEdUzVppyMfJH6K4kPjQRSZp8cLq',
          decimals: 18
        },
        quote: 'xtz'
      }
    }
  ],
  TESTNET: [
    {
      reward: WRAP_TOKEN_GRANADA_TESTNET,
      farmingContract: 'KT1Tgn7wYwmjhTuSot5DPZ8U1hPn7cPzhnea',
      pool: {
        contract: 'KT1Srr8aWcxPTptoCNrWoXGQdrrNWN6Zx58X',
        base: WRAP_TOKEN_GRANADA_TESTNET,
        quote: 'xtz'
      }
    },
    {
      reward: WRAP_TOKEN_GRANADA_TESTNET,
      farmingContract: 'KT1SHNTj8icDmdXhaTuqe2AF5pE4mzMt6BXk',
      pool: {
        contract: 'KT1FkFC5ovz9UrGoQJLd5hyjmz6aSnASTDsx',
        base: {
          symbol: 'wDAI',
          name: 'Dai Stable coin',
          tokenId: 0,
          contractAddress: 'KT1DJwRryZ11dGDnqmmRtTiSsgxQDY4bw3j4',
          thumbnailUri:
            'ipfs:////QmVov6RtfRNzuQGvGKmhnABUsfCiDKvn31amg8DUxzowtM',
          decimals: 18
        },
        quote: 'xtz'
      }
    }
  ]
};