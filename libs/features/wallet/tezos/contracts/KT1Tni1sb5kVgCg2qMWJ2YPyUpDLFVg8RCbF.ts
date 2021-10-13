export default {
  script:
    {
      code:
        [{
          prim: 'parameter',
          args:
            [{
              prim: 'or',
              args:
                [{
                  prim: 'or',
                  args:
                    [{
                      prim: 'or',
                      args:
                        [{ prim: 'unit', annots: ['%claim'] }, { prim: 'nat', annots: ['%deposit'] }]
                    },
                      {
                        prim: 'or',
                        args:
                          [{ prim: 'unit', annots: ['%escape'] },
                            { prim: 'address', annots: ['%setAdmin'] }]
                      }]
                },
                  {
                    prim: 'or',
                    args:
                      [{
                        prim: 'or',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{ prim: 'nat', annots: ['%rewardPerBlock'] },
                                { prim: 'nat', annots: ['%totalBlocks'] }],
                            annots: ['%updatePlan']
                          },
                            { prim: 'nat', annots: ['%withdraw'] }]
                      },
                        { prim: 'address', annots: ['%withdrawProfit'] }]
                  }]
            }]
        },
          {
            prim: 'storage',
            args:
              [{
                prim: 'pair',
                args:
                  [{
                    prim: 'pair',
                    args:
                      [{
                        prim: 'pair',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{ prim: 'address', annots: ['%admin'] },
                                    { prim: 'address', annots: ['%lpTokenContract'] }]
                              },
                                {
                                  prim: 'pair',
                                  args:
                                    [{ prim: 'address', annots: ['%rewardReserve'] },
                                      { prim: 'address', annots: ['%rewardTokenContract'] }]
                                }],
                            annots: ['%addresses']
                          },
                            {
                              prim: 'big_map',
                              args:
                                [{ prim: 'address' },
                                  {
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'nat', annots: ['%accumulatedRewardPerShareStart'] },
                                        { prim: 'nat', annots: ['%lpTokenBalance'] }]
                                  }],
                              annots: ['%delegators']
                            }]
                      },
                        {
                          prim: 'pair',
                          args:
                            [{
                              prim: 'pair',
                              args:
                                [{
                                  prim: 'pair',
                                  args:
                                    [{ prim: 'nat', annots: ['%accumulatedRewardPerShare'] },
                                      {
                                        prim: 'pair',
                                        args: [{ prim: 'nat', annots: ['%paid'] }, {
                                          prim: 'nat',
                                          annots: ['%unpaid']
                                        }],
                                        annots: ['%claimedRewards']
                                      }]
                                },
                                  {
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'nat', annots: ['%lastBlockUpdate'] },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'nat', annots: ['%rewardPerBlock'] },
                                              { prim: 'nat', annots: ['%totalBlocks'] }],
                                          annots: ['%plannedRewards']
                                        }]
                                  }],
                              annots: ['%farm']
                            },
                              { prim: 'nat', annots: ['%farmLpTokenBalance'] }]
                        }]
                  },
                    {
                      prim: 'pair',
                      args: [{ prim: 'nat', annots: ['%lp'] }, { prim: 'nat', annots: ['%reward'] }],
                      annots: ['%tokenIds']
                    }]
              }]
          },
          {
            prim: 'code',
            args:
              [[{
                prim: 'LAMBDA',
                args:
                  [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                    { prim: 'nat' },
                    [{ prim: 'UNPAIR' },
                      { prim: 'SWAP' },
                      { prim: 'DUP' },
                      { prim: 'DUG', args: [{ int: '2' }] },
                      { prim: 'SWAP' },
                      { prim: 'DUP' },
                      { prim: 'DUG', args: [{ int: '2' }] },
                      { prim: 'COMPARE' },
                      { prim: 'GE' },
                      {
                        prim: 'IF',
                        args:
                          [[],
                            [{
                              prim: 'PUSH',
                              args: [{ prim: 'string' }, { string: 'NotEnoughStakedTokenBalance' }]
                            },
                              { prim: 'FAILWITH' }]]
                      },
                      { prim: 'SUB' },
                      { prim: 'ABS' }]]
              },
                {
                  prim: 'LAMBDA',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'address' },
                          {
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                            { prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] }]
                                      },
                                        {
                                          prim: 'big_map',
                                          args:
                                            [{ prim: 'address' },
                                              { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                        }]
                                  },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{
                                              prim: 'pair',
                                              args:
                                                [{ prim: 'nat' }, {
                                                  prim: 'pair',
                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                }]
                                            },
                                              {
                                                prim: 'pair',
                                                args:
                                                  [{ prim: 'nat' }, {
                                                    prim: 'pair',
                                                    args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                  }]
                                              }]
                                        },
                                          { prim: 'nat' }]
                                    }]
                              },
                                { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                          }]
                    },
                      { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                      [{ prim: 'UNPAIR' },
                        { prim: 'SWAP' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'SWAP' },
                        { prim: 'GET' },
                        {
                          prim: 'IF_NONE',
                          args:
                            [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'DelegatorNotKnown' }] },
                              { prim: 'FAILWITH' }],
                              []]
                        }]]
                },
                {
                  prim: 'LAMBDA',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] },
                          {
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                            { prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] }]
                                      },
                                        {
                                          prim: 'big_map',
                                          args:
                                            [{ prim: 'address' },
                                              { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                        }]
                                  },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{
                                              prim: 'pair',
                                              args:
                                                [{ prim: 'nat' }, {
                                                  prim: 'pair',
                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                }]
                                            },
                                              {
                                                prim: 'pair',
                                                args:
                                                  [{ prim: 'nat' }, {
                                                    prim: 'pair',
                                                    args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                  }]
                                              }]
                                        },
                                          { prim: 'nat' }]
                                    }]
                              },
                                { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                          }]
                    },
                      {
                        prim: 'pair',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                        { prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] }]
                                  },
                                    {
                                      prim: 'big_map',
                                      args:
                                        [{ prim: 'address' },
                                          { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                    }]
                              },
                                {
                                  prim: 'pair',
                                  args:
                                    [{
                                      prim: 'pair',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'nat' }, {
                                              prim: 'pair',
                                              args: [{ prim: 'nat' }, { prim: 'nat' }]
                                            }]
                                        },
                                          {
                                            prim: 'pair',
                                            args:
                                              [{ prim: 'nat' }, {
                                                prim: 'pair',
                                                args: [{ prim: 'nat' }, { prim: 'nat' }]
                                              }]
                                          }]
                                    },
                                      { prim: 'nat' }]
                                }]
                          },
                            { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                      },
                      [{ prim: 'UNPAIR' },
                        { prim: 'UNPAIR' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '3' }] },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '3' }] },
                        { prim: 'CDR' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '4' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'DIG', args: [{ int: '4' }] },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '5' }] },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'DIG', args: [{ int: '4' }] },
                        { prim: 'SOME' },
                        { prim: 'DIG', args: [{ int: '4' }] },
                        { prim: 'UPDATE' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' }]]
                },
                {
                  prim: 'LAMBDA',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'nat' },
                          {
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                            { prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] }]
                                      },
                                        {
                                          prim: 'big_map',
                                          args:
                                            [{ prim: 'address' },
                                              { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                        }]
                                  },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{
                                              prim: 'pair',
                                              args:
                                                [{ prim: 'nat' }, {
                                                  prim: 'pair',
                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                }]
                                            },
                                              {
                                                prim: 'pair',
                                                args:
                                                  [{ prim: 'nat' }, {
                                                    prim: 'pair',
                                                    args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                  }]
                                              }]
                                        },
                                          { prim: 'nat' }]
                                    }]
                              },
                                { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                          }]
                    },
                      {
                        prim: 'pair',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                        { prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] }]
                                  },
                                    {
                                      prim: 'big_map',
                                      args:
                                        [{ prim: 'address' },
                                          { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                    }]
                              },
                                {
                                  prim: 'pair',
                                  args:
                                    [{
                                      prim: 'pair',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'nat' }, {
                                              prim: 'pair',
                                              args: [{ prim: 'nat' }, { prim: 'nat' }]
                                            }]
                                        },
                                          {
                                            prim: 'pair',
                                            args:
                                              [{ prim: 'nat' }, {
                                                prim: 'pair',
                                                args: [{ prim: 'nat' }, { prim: 'nat' }]
                                              }]
                                          }]
                                    },
                                      { prim: 'nat' }]
                                }]
                          },
                            { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                      },
                      [{ prim: 'UNPAIR' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CDR' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '3' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CDR' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '4' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CDR' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '4' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' }]]
                },
                {
                  prim: 'LAMBDA',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'nat' },
                          {
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                            { prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] }]
                                      },
                                        {
                                          prim: 'big_map',
                                          args:
                                            [{ prim: 'address' },
                                              { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                        }]
                                  },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{
                                              prim: 'pair',
                                              args:
                                                [{ prim: 'nat' }, {
                                                  prim: 'pair',
                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                }]
                                            },
                                              {
                                                prim: 'pair',
                                                args:
                                                  [{ prim: 'nat' }, {
                                                    prim: 'pair',
                                                    args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                  }]
                                              }]
                                        },
                                          { prim: 'nat' }]
                                    }]
                              },
                                { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                          }]
                    },
                      {
                        prim: 'pair',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                        { prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] }]
                                  },
                                    {
                                      prim: 'big_map',
                                      args:
                                        [{ prim: 'address' },
                                          { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                    }]
                              },
                                {
                                  prim: 'pair',
                                  args:
                                    [{
                                      prim: 'pair',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'nat' }, {
                                              prim: 'pair',
                                              args: [{ prim: 'nat' }, { prim: 'nat' }]
                                            }]
                                        },
                                          {
                                            prim: 'pair',
                                            args:
                                              [{ prim: 'nat' }, {
                                                prim: 'pair',
                                                args: [{ prim: 'nat' }, { prim: 'nat' }]
                                              }]
                                          }]
                                    },
                                      { prim: 'nat' }]
                                }]
                          },
                            { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                      },
                      [{ prim: 'UNPAIR' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CDR' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '3' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CDR' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '4' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'DIG', args: [{ int: '4' }] },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '5' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '4' }] },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '5' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' }]]
                },
                {
                  prim: 'LAMBDA',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'nat' },
                          {
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                            { prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] }]
                                      },
                                        {
                                          prim: 'big_map',
                                          args:
                                            [{ prim: 'address' },
                                              { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                        }]
                                  },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{
                                              prim: 'pair',
                                              args:
                                                [{ prim: 'nat' }, {
                                                  prim: 'pair',
                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                }]
                                            },
                                              {
                                                prim: 'pair',
                                                args:
                                                  [{ prim: 'nat' }, {
                                                    prim: 'pair',
                                                    args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                  }]
                                              }]
                                        },
                                          { prim: 'nat' }]
                                    }]
                              },
                                { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                          }]
                    },
                      {
                        prim: 'pair',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                        { prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] }]
                                  },
                                    {
                                      prim: 'big_map',
                                      args:
                                        [{ prim: 'address' },
                                          { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                    }]
                              },
                                {
                                  prim: 'pair',
                                  args:
                                    [{
                                      prim: 'pair',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'nat' }, {
                                              prim: 'pair',
                                              args: [{ prim: 'nat' }, { prim: 'nat' }]
                                            }]
                                        },
                                          {
                                            prim: 'pair',
                                            args:
                                              [{ prim: 'nat' }, {
                                                prim: 'pair',
                                                args: [{ prim: 'nat' }, { prim: 'nat' }]
                                              }]
                                          }]
                                    },
                                      { prim: 'nat' }]
                                }]
                          },
                            { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                      },
                      [{ prim: 'UNPAIR' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CDR' },
                        { prim: 'SWAP' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '3' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' }]]
                },
                { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1000000' }] },
                { prim: 'DIG', args: [{ int: '3' }] },
                { prim: 'DIG', args: [{ int: '3' }] },
                { prim: 'DUP' },
                { prim: 'DUG', args: [{ int: '4' }] },
                { prim: 'DIG', args: [{ int: '2' }] },
                { prim: 'DUP' },
                { prim: 'DUG', args: [{ int: '3' }] },
                { prim: 'PAIR' },
                { prim: 'PAIR' },
                {
                  prim: 'LAMBDA',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{
                          prim: 'pair',
                          args:
                            [{
                              prim: 'pair',
                              args:
                                [{ prim: 'nat' },
                                  {
                                    prim: 'lambda',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'nat' },
                                            {
                                              prim: 'pair',
                                              args:
                                                [{
                                                  prim: 'pair',
                                                  args:
                                                    [{
                                                      prim: 'pair',
                                                      args:
                                                        [{
                                                          prim: 'pair',
                                                          args:
                                                            [{
                                                              prim: 'pair',
                                                              args: [{ prim: 'address' }, { prim: 'address' }]
                                                            },
                                                              {
                                                                prim: 'pair',
                                                                args: [{ prim: 'address' }, { prim: 'address' }]
                                                              }]
                                                        },
                                                          {
                                                            prim: 'big_map',
                                                            args:
                                                              [{ prim: 'address' },
                                                                {
                                                                  prim: 'pair',
                                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                }]
                                                          }]
                                                    },
                                                      {
                                                        prim: 'pair',
                                                        args:
                                                          [{
                                                            prim: 'pair',
                                                            args:
                                                              [{
                                                                prim: 'pair',
                                                                args:
                                                                  [{ prim: 'nat' }, {
                                                                    prim: 'pair',
                                                                    args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                  }]
                                                              },
                                                                {
                                                                  prim: 'pair',
                                                                  args:
                                                                    [{ prim: 'nat' }, {
                                                                      prim: 'pair',
                                                                      args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                    }]
                                                                }]
                                                          },
                                                            { prim: 'nat' }]
                                                      }]
                                                },
                                                  { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                            }]
                                      },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{
                                              prim: 'pair',
                                              args:
                                                [{
                                                  prim: 'pair',
                                                  args:
                                                    [{
                                                      prim: 'pair',
                                                      args:
                                                        [{
                                                          prim: 'pair',
                                                          args: [{ prim: 'address' }, { prim: 'address' }]
                                                        },
                                                          {
                                                            prim: 'pair',
                                                            args: [{ prim: 'address' }, { prim: 'address' }]
                                                          }]
                                                    },
                                                      {
                                                        prim: 'big_map',
                                                        args:
                                                          [{ prim: 'address' },
                                                            { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                                      }]
                                                },
                                                  {
                                                    prim: 'pair',
                                                    args:
                                                      [{
                                                        prim: 'pair',
                                                        args:
                                                          [{
                                                            prim: 'pair',
                                                            args:
                                                              [{ prim: 'nat' }, {
                                                                prim: 'pair',
                                                                args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                              }]
                                                          },
                                                            {
                                                              prim: 'pair',
                                                              args:
                                                                [{ prim: 'nat' }, {
                                                                  prim: 'pair',
                                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                }]
                                                            }]
                                                      },
                                                        { prim: 'nat' }]
                                                  }]
                                            },
                                              { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                        }]
                                  }]
                            },
                              {
                                prim: 'lambda',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'nat' },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{
                                              prim: 'pair',
                                              args:
                                                [{
                                                  prim: 'pair',
                                                  args:
                                                    [{
                                                      prim: 'pair',
                                                      args:
                                                        [{
                                                          prim: 'pair',
                                                          args: [{ prim: 'address' }, { prim: 'address' }]
                                                        },
                                                          {
                                                            prim: 'pair',
                                                            args: [{ prim: 'address' }, { prim: 'address' }]
                                                          }]
                                                    },
                                                      {
                                                        prim: 'big_map',
                                                        args:
                                                          [{ prim: 'address' },
                                                            { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                                      }]
                                                },
                                                  {
                                                    prim: 'pair',
                                                    args:
                                                      [{
                                                        prim: 'pair',
                                                        args:
                                                          [{
                                                            prim: 'pair',
                                                            args:
                                                              [{ prim: 'nat' }, {
                                                                prim: 'pair',
                                                                args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                              }]
                                                          },
                                                            {
                                                              prim: 'pair',
                                                              args:
                                                                [{ prim: 'nat' }, {
                                                                  prim: 'pair',
                                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                }]
                                                            }]
                                                      },
                                                        { prim: 'nat' }]
                                                  }]
                                            },
                                              { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                        }]
                                  },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{
                                              prim: 'pair',
                                              args:
                                                [{
                                                  prim: 'pair',
                                                  args:
                                                    [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                                      {
                                                        prim: 'pair',
                                                        args: [{ prim: 'address' }, { prim: 'address' }]
                                                      }]
                                                },
                                                  {
                                                    prim: 'big_map',
                                                    args:
                                                      [{ prim: 'address' },
                                                        { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                                  }]
                                            },
                                              {
                                                prim: 'pair',
                                                args:
                                                  [{
                                                    prim: 'pair',
                                                    args:
                                                      [{
                                                        prim: 'pair',
                                                        args:
                                                          [{ prim: 'nat' }, {
                                                            prim: 'pair',
                                                            args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                          }]
                                                      },
                                                        {
                                                          prim: 'pair',
                                                          args:
                                                            [{ prim: 'nat' }, {
                                                              prim: 'pair',
                                                              args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                            }]
                                                        }]
                                                  },
                                                    { prim: 'nat' }]
                                              }]
                                        },
                                          { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                    }]
                              }]
                        },
                          {
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                            { prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] }]
                                      },
                                        {
                                          prim: 'big_map',
                                          args:
                                            [{ prim: 'address' },
                                              { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                        }]
                                  },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{
                                              prim: 'pair',
                                              args:
                                                [{ prim: 'nat' }, {
                                                  prim: 'pair',
                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                }]
                                            },
                                              {
                                                prim: 'pair',
                                                args:
                                                  [{ prim: 'nat' }, {
                                                    prim: 'pair',
                                                    args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                  }]
                                              }]
                                        },
                                          { prim: 'nat' }]
                                    }]
                              },
                                { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                          }]
                    },
                      {
                        prim: 'pair',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                        { prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] }]
                                  },
                                    {
                                      prim: 'big_map',
                                      args:
                                        [{ prim: 'address' },
                                          { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                    }]
                              },
                                {
                                  prim: 'pair',
                                  args:
                                    [{
                                      prim: 'pair',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'nat' }, {
                                              prim: 'pair',
                                              args: [{ prim: 'nat' }, { prim: 'nat' }]
                                            }]
                                        },
                                          {
                                            prim: 'pair',
                                            args:
                                              [{ prim: 'nat' }, {
                                                prim: 'pair',
                                                args: [{ prim: 'nat' }, { prim: 'nat' }]
                                              }]
                                          }]
                                    },
                                      { prim: 'nat' }]
                                }]
                          },
                            { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                      },
                      [{ prim: 'DUP' },
                        { prim: 'CDR' },
                        { prim: 'SWAP' },
                        { prim: 'CAR' },
                        { prim: 'DUP' },
                        { prim: 'CDR' },
                        { prim: 'SWAP' },
                        { prim: 'CAR' },
                        { prim: 'DUP' },
                        { prim: 'CDR' },
                        { prim: 'SWAP' },
                        { prim: 'CAR' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'LEVEL' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'SWAP' },
                        { prim: 'COMPARE' },
                        { prim: 'NEQ' },
                        {
                          prim: 'IF',
                          args:
                            [[{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                              { prim: 'SWAP' },
                              { prim: 'CAR' },
                              { prim: 'CDR' },
                              { prim: 'CDR' },
                              { prim: 'COMPARE' },
                              { prim: 'EQ' },
                              {
                                prim: 'IF',
                                args:
                                  [[{ prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
                                    { prim: 'RIGHT', args: [{ prim: 'unit' }] },
                                    { prim: 'LEFT', args: [{ prim: 'unit' }] }],
                                    [{ prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
                                      {
                                        prim: 'RIGHT',
                                        args: [{ prim: 'or', args: [{ prim: 'unit' }, { prim: 'unit' }] }]
                                      }]]
                              }],
                              [{ prim: 'DROP' },
                                { prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
                                { prim: 'LEFT', args: [{ prim: 'unit' }] },
                                { prim: 'LEFT', args: [{ prim: 'unit' }] }]]
                        },
                        {
                          prim: 'IF_LEFT',
                          args:
                            [[{ prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'DROP' },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'DROP' },
                              {
                                prim: 'IF_LEFT',
                                args:
                                  [[{ prim: 'DROP', args: [{ int: '2' }] }, { prim: 'SWAP' }, { prim: 'DROP' }],
                                    [{ prim: 'DROP' }, { prim: 'PAIR' }, { prim: 'EXEC' }]]
                              }],
                              [{ prim: 'DROP' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '3' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'SUB' },
                                { prim: 'ABS' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '4' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'SWAP' },
                                { prim: 'MUL' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '3' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'ADD' },
                                { prim: 'DUP' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '3' }] },
                                { prim: 'ADD' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '4' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'MUL' },
                                { prim: 'DUP' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'COMPARE' },
                                { prim: 'GT' },
                                {
                                  prim: 'IF',
                                  args:
                                    [[{ prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'DROP' },
                                      { prim: 'SUB' },
                                      { prim: 'ABS' }],
                                      [{ prim: 'DROP', args: [{ int: '2' }] }]]
                                },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'ADD' },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '5' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'SWAP' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'MUL' },
                                { prim: 'EDIV' },
                                {
                                  prim: 'IF_NONE',
                                  args:
                                    [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'DIV by 0' }] },
                                      { prim: 'FAILWITH' }],
                                      []]
                                },
                                { prim: 'CAR' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'ADD' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '3' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '4' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '5' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'SWAP' },
                                { prim: 'PAIR' },
                                { prim: 'EXEC' }]]
                        }]]
                },
                { prim: 'SWAP' },
                { prim: 'APPLY' },
                {
                  prim: 'LAMBDA',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{
                          prim: 'pair',
                          args:
                            [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                              { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                        },
                          { prim: 'address' }]
                    },
                      { prim: 'operation' },
                      [{ prim: 'UNPAIR' },
                        { prim: 'UNPAIR' },
                        { prim: 'UNPAIR' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'UNPAIR' },
                        { prim: 'DIG', args: [{ int: '4' }] },
                        {
                          prim: 'CONTRACT',
                          args:
                            [{
                              prim: 'list',
                              args:
                                [{
                                  prim: 'pair',
                                  args:
                                    [{ prim: 'address', annots: ['%from_'] },
                                      {
                                        prim: 'list',
                                        args:
                                          [{
                                            prim: 'pair',
                                            args:
                                              [{ prim: 'address', annots: ['%to_'] },
                                                {
                                                  prim: 'pair',
                                                  args:
                                                    [{ prim: 'nat', annots: ['%token_id'] }, {
                                                      prim: 'nat',
                                                      annots: ['%amount']
                                                    }]
                                                }]
                                          }],
                                        annots: ['%txs']
                                      }]
                                }]
                            }],
                          annots: ['%transfer']
                        },
                        {
                          prim: 'IF_NONE',
                          args:
                            [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'NoContractFound' }] },
                              { prim: 'FAILWITH' }],
                              []]
                        },
                        { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                        {
                          prim: 'NIL',
                          args:
                            [{
                              prim: 'pair',
                              args:
                                [{ prim: 'address' },
                                  {
                                    prim: 'list',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'address' },
                                            { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                      }]
                                  }]
                            }]
                        },
                        {
                          prim: 'NIL',
                          args:
                            [{
                              prim: 'pair',
                              args:
                                [{ prim: 'address' },
                                  { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                            }]
                        },
                        { prim: 'DIG', args: [{ int: '4' }] },
                        { prim: 'DIG', args: [{ int: '5' }] },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '6' }] },
                        { prim: 'PAIR' },
                        { prim: 'CONS' },
                        { prim: 'DIG', args: [{ int: '4' }] },
                        { prim: 'PAIR' },
                        { prim: 'CONS' },
                        { prim: 'TRANSFER_TOKENS' }]]
                },
                {
                  prim: 'LAMBDA',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{
                          prim: 'pair',
                          args:
                            [{
                              prim: 'pair',
                              args:
                                [{
                                  prim: 'pair',
                                  args:
                                    [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                      { prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] }]
                                },
                                  {
                                    prim: 'big_map',
                                    args:
                                      [{ prim: 'address' },
                                        { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                  }]
                            },
                              {
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'nat' }, { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                      },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'nat' }, {
                                              prim: 'pair',
                                              args: [{ prim: 'nat' }, { prim: 'nat' }]
                                            }]
                                        }]
                                  },
                                    { prim: 'nat' }]
                              }]
                        },
                          { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                    },
                      { prim: 'unit' },
                      [{ prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'SENDER' },
                        { prim: 'COMPARE' },
                        { prim: 'EQ' },
                        {
                          prim: 'IF',
                          args:
                            [[{ prim: 'UNIT' }],
                              [{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'SenderIsNotAdmin' }] },
                                { prim: 'FAILWITH' }]]
                        }]]
                },
                {
                  prim: 'LAMBDA',
                  args:
                    [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                      { prim: 'nat' },
                      [{ prim: 'UNPAIR' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'COMPARE' },
                        { prim: 'GE' },
                        {
                          prim: 'IF',
                          args:
                            [[],
                              [{
                                prim: 'PUSH',
                                args: [{ prim: 'string' }, { string: 'NotEnoughStakedTokenBalance' }]
                              },
                                { prim: 'FAILWITH' }]]
                        },
                        { prim: 'SUB' },
                        { prim: 'ABS' }]]
                },
                { prim: 'DIG', args: [{ int: '10' }] },
                { prim: 'UNPAIR' },
                {
                  prim: 'IF_LEFT',
                  args:
                    [[{
                      prim: 'IF_LEFT',
                      args:
                        [[{ prim: 'DIG', args: [{ int: '2' }] },
                          { prim: 'DROP' },
                          { prim: 'DIG', args: [{ int: '2' }] },
                          { prim: 'DROP' },
                          {
                            prim: 'IF_LEFT',
                            args:
                              [[{ prim: 'DROP' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'DROP' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'SENDER' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'SWAP' },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '8' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '9' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'DUP' },
                                { prim: 'CAR' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '9' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '10' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'SWAP' },
                                { prim: 'CDR' },
                                { prim: 'SWAP' },
                                { prim: 'MUL' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'SWAP' },
                                { prim: 'EDIV' },
                                {
                                  prim: 'IF_NONE',
                                  args:
                                    [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'DIV by 0' }] },
                                      { prim: 'FAILWITH' }],
                                      []]
                                },
                                { prim: 'CAR' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '3' }] },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '8' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'SWAP' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '5' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '6' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'ADD' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '3' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '4' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '5' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '5' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'DUP' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '4' }] },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'SWAP' },
                                { prim: 'NIL', args: [{ prim: 'operation' }] },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'CONS' },
                                { prim: 'PAIR' }],
                                [{ prim: 'SWAP' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '4' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'SENDER' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'SWAP' },
                                  { prim: 'GET' },
                                  {
                                    prim: 'IF_NONE',
                                    args:
                                      [[{ prim: 'PUSH', args: [{ prim: 'bool' }, { prim: 'False' }] }],
                                        [{ prim: 'DROP' }, {
                                          prim: 'PUSH',
                                          args: [{ prim: 'bool' }, { prim: 'True' }]
                                        }]]
                                  },
                                  { prim: 'DUP' },
                                  {
                                    prim: 'IF',
                                    args:
                                      [[{ prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'DIG', args: [{ int: '5' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'EXEC' },
                                        { prim: 'SENDER' },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '12' }] },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '13' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'EXEC' },
                                        { prim: 'DUP' },
                                        { prim: 'CAR' },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '13' }] },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '14' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'EXEC' },
                                        { prim: 'SWAP' },
                                        { prim: 'CDR' },
                                        { prim: 'SWAP' },
                                        { prim: 'MUL' },
                                        { prim: 'DIG', args: [{ int: '7' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'EDIV' },
                                        {
                                          prim: 'IF_NONE',
                                          args:
                                            [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'DIV by 0' }] },
                                              { prim: 'FAILWITH' }],
                                              []]
                                        },
                                        { prim: 'CAR' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '3' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '12' }] },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '13' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'EXEC' },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'CDR' },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'PAIR' },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '9' }] },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '10' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'EXEC' },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CDR' },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '12' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'EXEC' },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '8' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'EXEC' },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'ADD' },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'CDR' },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '3' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CDR' },
                                        { prim: 'DIG', args: [{ int: '3' }] },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '4' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'DIG', args: [{ int: '4' }] },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '5' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CDR' },
                                        { prim: 'DIG', args: [{ int: '4' }] },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '4' }] },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '5' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'PAIR' },
                                        { prim: 'PAIR' },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'PAIR' },
                                        { prim: 'PAIR' },
                                        { prim: 'DUP' },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CDR' },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'CDR' },
                                        { prim: 'CDR' },
                                        { prim: 'DIG', args: [{ int: '3' }] },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '3' }] },
                                        { prim: 'DIG', args: [{ int: '3' }] },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '4' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'PAIR' },
                                        { prim: 'PAIR' },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '5' }] },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '6' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'EXEC' },
                                        { prim: 'SWAP' },
                                        { prim: 'NIL', args: [{ prim: 'operation' }] },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'CONS' },
                                        { prim: 'PAIR' }],
                                        [{ prim: 'DIG', args: [{ int: '5' }] },
                                          { prim: 'DROP' },
                                          { prim: 'DIG', args: [{ int: '5' }] },
                                          { prim: 'DROP' },
                                          { prim: 'DIG', args: [{ int: '6' }] },
                                          { prim: 'DROP' },
                                          { prim: 'DIG', args: [{ int: '8' }] },
                                          { prim: 'DROP' },
                                          { prim: 'DIG', args: [{ int: '2' }] },
                                          { prim: 'NIL', args: [{ prim: 'operation' }] },
                                          { prim: 'PAIR' }]]
                                  },
                                  { prim: 'UNPAIR' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  {
                                    prim: 'IF',
                                    args:
                                      [[{ prim: 'SWAP' },
                                        { prim: 'DIG', args: [{ int: '3' }] },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '4' }] },
                                        { prim: 'DIG', args: [{ int: '3' }] },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '4' }] },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '3' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '10' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'EXEC' },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'CDR' },
                                        { prim: 'ADD' },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'PAIR' },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '6' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'EXEC' }],
                                        [{ prim: 'DIG', args: [{ int: '7' }] },
                                          { prim: 'DROP' },
                                          { prim: 'SWAP' },
                                          { prim: 'DIG', args: [{ int: '3' }] },
                                          { prim: 'DUP' },
                                          { prim: 'DUG', args: [{ int: '4' }] },
                                          { prim: 'DIG', args: [{ int: '3' }] },
                                          { prim: 'DUP' },
                                          { prim: 'DUG', args: [{ int: '4' }] },
                                          { prim: 'SWAP' },
                                          { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                          { prim: 'ADD' },
                                          { prim: 'DIG', args: [{ int: '2' }] },
                                          { prim: 'SWAP' },
                                          { prim: 'DIG', args: [{ int: '2' }] },
                                          { prim: 'PAIR' },
                                          { prim: 'PAIR' },
                                          { prim: 'DIG', args: [{ int: '6' }] },
                                          { prim: 'SWAP' },
                                          { prim: 'EXEC' }]]
                                  },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '4' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CDR' },
                                  { prim: 'ADD' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '5' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DUP' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CDR' },
                                  { prim: 'CAR' },
                                  { prim: 'DIG', args: [{ int: '5' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'SELF_ADDRESS' },
                                  { prim: 'DIG', args: [{ int: '5' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CONS' },
                                  { prim: 'PAIR' }]]
                          }],
                          [{ prim: 'DIG', args: [{ int: '5' }] },
                            { prim: 'DROP' },
                            { prim: 'DIG', args: [{ int: '5' }] },
                            { prim: 'DROP' },
                            { prim: 'DIG', args: [{ int: '6' }] },
                            { prim: 'DROP' },
                            { prim: 'DIG', args: [{ int: '6' }] },
                            { prim: 'DROP' },
                            { prim: 'DIG', args: [{ int: '7' }] },
                            { prim: 'DROP' },
                            {
                              prim: 'IF_LEFT',
                              args:
                                [[{ prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'DROP', args: [{ int: '2' }] },
                                  { prim: 'SENDER' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '6' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DUP' },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '4' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CDR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '4' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '4' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '3' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '3' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '4' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  {
                                    prim: 'NONE',
                                    args: [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                  },
                                  { prim: 'SWAP' },
                                  { prim: 'UPDATE' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DUP' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CDR' },
                                  { prim: 'CAR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'CDR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'SELF_ADDRESS' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'SWAP' },
                                  { prim: 'NIL', args: [{ prim: 'operation' }] },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'CONS' },
                                  { prim: 'PAIR' }],
                                  [{ prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'DROP' },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'DROP' },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'DROP' },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'DROP' },
                                    { prim: 'SWAP' },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '2' }] },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'EXEC' },
                                    { prim: 'DROP' },
                                    { prim: 'SWAP' },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '2' }] },
                                    { prim: 'CDR' },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '3' }] },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '4' }] },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'DIG', args: [{ int: '4' }] },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '5' }] },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'DIG', args: [{ int: '5' }] },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'DIG', args: [{ int: '5' }] },
                                    { prim: 'PAIR' },
                                    { prim: 'PAIR' },
                                    { prim: 'PAIR' },
                                    { prim: 'PAIR' },
                                    { prim: 'PAIR' },
                                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                                    { prim: 'PAIR' }]]
                            }]]
                    }],
                      [{
                        prim: 'IF_LEFT',
                        args:
                          [[{
                            prim: 'IF_LEFT',
                            args:
                              [[{ prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'DROP' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'DROP' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'DROP' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'DROP' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'DROP' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'DROP' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'DROP' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'DROP' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'DROP' },
                                { prim: 'SWAP' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'SWAP' },
                                { prim: 'UNPAIR' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '3' }] },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '4' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '4' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '4' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'NIL', args: [{ prim: 'operation' }] },
                                { prim: 'PAIR' }],
                                [{ prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'DROP' },
                                  { prim: 'SWAP' },
                                  { prim: 'DIG', args: [{ int: '4' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '5' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DIG', args: [{ int: '4' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'SENDER' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '11' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '12' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DUP' },
                                  { prim: 'CAR' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '12' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '13' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'SWAP' },
                                  { prim: 'CDR' },
                                  { prim: 'SWAP' },
                                  { prim: 'MUL' },
                                  { prim: 'DIG', args: [{ int: '6' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EDIV' },
                                  {
                                    prim: 'IF_NONE',
                                    args:
                                      [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'DIV by 0' }] },
                                        { prim: 'FAILWITH' }],
                                        []]
                                  },
                                  { prim: 'CAR' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '3' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '11' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '12' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '8' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '9' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CDR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '11' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '12' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '7' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CAR' },
                                  { prim: 'ADD' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '3' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '4' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '4' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '5' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '4' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '4' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '5' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DUP' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CDR' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CDR' },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '4' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CAR' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '4' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '5' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'SWAP' },
                                  { prim: 'NIL', args: [{ prim: 'operation' }] },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'CONS' },
                                  { prim: 'SENDER' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '3' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '9' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '10' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DROP' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '4' }] },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '3' }] },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '3' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '11' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'CDR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '10' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '7' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '4' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'CDR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '5' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '5' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DUP' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CDR' },
                                  { prim: 'CAR' },
                                  { prim: 'DIG', args: [{ int: '5' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'SELF_ADDRESS' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CONS' },
                                  { prim: 'PAIR' }]]
                          }],
                            [{ prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'DROP' },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'DROP' },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'DROP' },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'DROP' },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'DROP' },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'DROP' },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'DROP' },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'DROP' },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'DROP' },
                              { prim: 'SWAP' },
                              { prim: 'DUP' },
                              { prim: 'DUG', args: [{ int: '2' }] },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'SWAP' },
                              { prim: 'EXEC' },
                              { prim: 'DROP' },
                              { prim: 'SWAP' },
                              { prim: 'DUP' },
                              { prim: 'DUG', args: [{ int: '2' }] },
                              { prim: 'CAR' },
                              { prim: 'CAR' },
                              { prim: 'CAR' },
                              { prim: 'CAR' },
                              { prim: 'CDR' },
                              { prim: 'CONTRACT', args: [{ prim: 'address' }], annots: ['%withdrawProfit'] },
                              {
                                prim: 'IF_NONE',
                                args:
                                  [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'NoContractFound' }] },
                                    { prim: 'FAILWITH' }],
                                    []]
                              },
                              { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                              { prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'TRANSFER_TOKENS' },
                              { prim: 'SWAP' },
                              { prim: 'NIL', args: [{ prim: 'operation' }] },
                              { prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'CONS' },
                              { prim: 'PAIR' }]]
                      }]]
                }]]
          }],
      storage:
        {
          prim: 'Pair',
          args:
            [{
              prim: 'Pair',
              args:
                [{
                  prim: 'Pair',
                  args:
                    [{
                      prim: 'Pair',
                      args:
                        [{
                          prim: 'Pair',
                          args:
                            [{ bytes: '0000e466ff944f5a66a06c787f02034add4afb8ac0cf' },
                              { bytes: '012bbed8b98fa24c4789d49303b6bd5c6f5183017800' }]
                        },
                          {
                            prim: 'Pair',
                            args:
                              [{ bytes: '0000bf0e01bb45b1567a23bbf32789ffd0b59e8c6452' },
                                { bytes: '0181e59d439a9d27a80396e2f360d9de8cbc4a1ef300' }]
                          }]
                    },
                      { int: '3258' }]
                },
                  {
                    prim: 'Pair',
                    args:
                      [[{
                        prim: 'Pair',
                        args:
                          [{ int: '1700112904' },
                            { prim: 'Pair', args: [{ int: '10207830279877' }, { int: '401704557997' }] }]
                      },
                        { int: '1773241' },
                        { int: '38675458' },
                        { int: '274329' }],
                        { int: '9156492594' }]
                  }]
            },
              { prim: 'Pair', args: [{ int: '0' }, { int: '0' }] }]
        }
    },
  entrypoints:
    {
      entrypoints:
        {
          withdrawProfit: { prim: 'address' },
          withdraw: { prim: 'nat' },
          updatePlan:
            {
              prim: 'pair',
              args:
                [{ prim: 'nat', annots: ['%rewardPerBlock'] },
                  { prim: 'nat', annots: ['%totalBlocks'] }]
            },
          setAdmin: { prim: 'address' },
          escape: { prim: 'unit' },
          deposit: { prim: 'nat' },
          claim: { prim: 'unit' }
        }
    }
};