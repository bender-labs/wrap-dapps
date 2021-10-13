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
                        [{ prim: 'address', annots: ['%change_admin'] },
                          { prim: 'unit', annots: ['%confirm_new_admin'] }],
                      annots: ['%admin']
                    },
                      {
                        prim: 'or',
                        args:
                          [{
                            prim: 'or',
                            args:
                              [{ prim: 'nat', annots: ['%set_blocks_per_cycle'] },
                                { prim: 'nat', annots: ['%set_default_fees'] }]
                          },
                            {
                              prim: 'map',
                              args: [{ prim: 'nat' }, { prim: 'nat' }],
                              annots: ['%set_fees_per_cycles']
                            }],
                        annots: ['%fees']
                      }]
                },
                  {
                    prim: 'or',
                    args:
                      [{
                        prim: 'or',
                        args:
                          [{ prim: 'nat', annots: ['%change_duration'] },
                            { prim: 'nat', annots: ['%update_plan'] }],
                        annots: ['%plan']
                      },
                        {
                          prim: 'or',
                          args:
                            [{
                              prim: 'or',
                              args:
                                [{ prim: 'unit', annots: ['%claim'] }, { prim: 'nat', annots: ['%stake'] }]
                            },
                              {
                                prim: 'pair',
                                args:
                                  [{ prim: 'nat', annots: ['%stake_index'] },
                                    { prim: 'nat', annots: ['%amount'] }],
                                annots: ['%withdraw']
                              }],
                          annots: ['%wallet']
                        }]
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
                              [{ prim: 'address', annots: ['%address'] },
                                { prim: 'option', args: [{ prim: 'address' }], annots: ['%pending_admin'] }],
                            annots: ['%admin']
                          },
                            {
                              prim: 'pair',
                              args:
                                [{
                                  prim: 'pair',
                                  args:
                                    [{ prim: 'nat', annots: ['%blocks_per_cycle'] },
                                      { prim: 'address', annots: ['%burn_address'] }]
                                },
                                  {
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'nat', annots: ['%default_fees'] },
                                        {
                                          prim: 'map',
                                          args: [{ prim: 'nat' }, { prim: 'nat' }],
                                          annots: ['%fees_per_cycles']
                                        }]
                                  }],
                              annots: ['%fees']
                            }]
                      },
                        {
                          prim: 'pair',
                          args:
                            [{
                              prim: 'pair',
                              args:
                                [{
                                  prim: 'big_map',
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
                                                  [{ prim: 'nat', annots: ['%balance'] }, {
                                                    prim: 'nat',
                                                    annots: ['%counter']
                                                  }]
                                              },
                                                {
                                                  prim: 'pair',
                                                  args:
                                                    [{ prim: 'nat', annots: ['%reward_per_token_paid'] },
                                                      {
                                                        prim: 'map',
                                                        args:
                                                          [{ prim: 'nat' },
                                                            {
                                                              prim: 'pair',
                                                              args:
                                                                [{ prim: 'nat', annots: ['%amount'] }, {
                                                                  prim: 'nat',
                                                                  annots: ['%level']
                                                                }]
                                                            }],
                                                        annots: ['%stakes']
                                                      }]
                                                }]
                                          },
                                            { prim: 'nat', annots: ['%unpaid'] }]
                                      }],
                                  annots: ['%delegators']
                                },
                                  { prim: 'nat', annots: ['%total_supply'] }],
                              annots: ['%ledger']
                            },
                              {
                                prim: 'big_map',
                                args: [{ prim: 'string' }, { prim: 'bytes' }],
                                annots: ['%metadata']
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
                                    [{ prim: 'nat', annots: ['%accumulated_reward_per_token'] },
                                      { prim: 'nat', annots: ['%exponent'] }]
                                },
                                  {
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'nat', annots: ['%last_block_update'] },
                                        { prim: 'nat', annots: ['%period_end'] }]
                                  }]
                            },
                              {
                                prim: 'pair',
                                args:
                                  [{ prim: 'nat', annots: ['%reward_per_block'] },
                                    { prim: 'nat', annots: ['%reward_remainder'] }]
                              }],
                          annots: ['%reward']
                        },
                          {
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{ prim: 'nat', annots: ['%duration'] },
                                    { prim: 'address', annots: ['%reserve_contract'] }]
                              },
                                {
                                  prim: 'pair',
                                  args:
                                    [{
                                      prim: 'pair',
                                      args: [{ prim: 'address' }, { prim: 'nat' }],
                                      annots: ['%reward_token']
                                    },
                                      {
                                        prim: 'pair',
                                        args: [{ prim: 'address' }, { prim: 'nat' }],
                                        annots: ['%staked_token']
                                      }]
                                }],
                            annots: ['%settings']
                          }]
                    }]
              }]
          },
          {
            prim: 'code',
            args:
              [[{
                prim: 'LAMBDA',
                args:
                  [{
                    prim: 'pair',
                    args:
                      [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                        {
                          prim: 'pair',
                          args:
                            [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] },
                              { prim: 'nat' }]
                        }]
                  },
                    { prim: 'operation' },
                    [{ prim: 'UNPAIR' },
                      { prim: 'UNPAIR' },
                      { prim: 'DIG', args: [{ int: '2' }] },
                      { prim: 'UNPAIR' },
                      { prim: 'UNPAIR' },
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
                          [[{ prim: 'DROP', args: [{ int: '4' }] },
                            { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'not_fa2' }] },
                            { prim: 'FAILWITH' }],
                            [{ prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
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
                              { prim: 'DIG', args: [{ int: '5' }] },
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
                              { prim: 'DIG', args: [{ int: '7' }] },
                              { prim: 'DIG', args: [{ int: '6' }] },
                              { prim: 'DIG', args: [{ int: '7' }] },
                              { prim: 'SWAP' },
                              { prim: 'PAIR' },
                              { prim: 'SWAP' },
                              { prim: 'PAIR' },
                              { prim: 'CONS' },
                              { prim: 'SWAP' },
                              { prim: 'PAIR' },
                              { prim: 'CONS' },
                              { prim: 'TRANSFER_TOKENS' }]]
                      }]]
              },
                { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'BAD_AMOUNT' }] },
                {
                  prim: 'LAMBDA',
                  args:
                    [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                      { prim: 'nat' },
                      [{ prim: 'UNPAIR' },
                        { prim: 'SUB' },
                        { prim: 'ISNAT' },
                        {
                          prim: 'IF_NONE',
                          args:
                            [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'NEGATIVE_BALANCE' }] },
                              { prim: 'FAILWITH' }],
                              []]
                        }]]
                },
                {
                  prim: 'LAMBDA',
                  args:
                    [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'string' }] },
                      { prim: 'nat' },
                      [{ prim: 'UNPAIR' },
                        { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'COMPARE' },
                        { prim: 'EQ' },
                        {
                          prim: 'IF',
                          args:
                            [[{ prim: 'DROP' }, { prim: 'FAILWITH' }],
                              [{ prim: 'SWAP' }, { prim: 'DROP' }]]
                        }]]
                },
                {
                  prim: 'LAMBDA',
                  args:
                    [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                      { prim: 'nat' },
                      [{ prim: 'UNPAIR' },
                        { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1' }] },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' },
                        { prim: 'LEFT', args: [{ prim: 'nat' }] },
                        {
                          prim: 'LOOP_LEFT',
                          args:
                            [[{ prim: 'UNPAIR' },
                              { prim: 'UNPAIR' },
                              { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                              { prim: 'DUP', args: [{ int: '3' }] },
                              { prim: 'COMPARE' },
                              { prim: 'EQ' },
                              {
                                prim: 'IF',
                                args:
                                  [[{ prim: 'DROP', args: [{ int: '2' }] },
                                    {
                                      prim: 'RIGHT',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{
                                              prim: 'pair',
                                              args: [{ prim: 'nat' }, { prim: 'nat' }]
                                            }, { prim: 'nat' }]
                                        }]
                                    }],
                                    [{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1' }] },
                                      { prim: 'DUP', args: [{ int: '3' }] },
                                      { prim: 'COMPARE' },
                                      { prim: 'EQ' },
                                      {
                                        prim: 'IF',
                                        args:
                                          [[{ prim: 'SWAP' },
                                            { prim: 'DROP' },
                                            { prim: 'MUL' },
                                            {
                                              prim: 'RIGHT',
                                              args:
                                                [{
                                                  prim: 'pair',
                                                  args:
                                                    [{
                                                      prim: 'pair',
                                                      args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                    }, { prim: 'nat' }]
                                                }]
                                            }],
                                            [{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '2' }] },
                                              { prim: 'DUP', args: [{ int: '3' }] },
                                              { prim: 'EDIV' },
                                              {
                                                prim: 'IF_NONE',
                                                args:
                                                  [[{ prim: 'DROP', args: [{ int: '3' }] },
                                                    {
                                                      prim: 'PUSH',
                                                      args: [{ prim: 'string' }, { string: 'bad_scale' }]
                                                    },
                                                    { prim: 'FAILWITH' }],
                                                    [{ prim: 'UNPAIR' },
                                                      { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                                      { prim: 'DIG', args: [{ int: '2' }] },
                                                      { prim: 'COMPARE' },
                                                      { prim: 'EQ' },
                                                      {
                                                        prim: 'IF',
                                                        args:
                                                          [[{ prim: 'DIG', args: [{ int: '2' }] },
                                                            { prim: 'DROP' },
                                                            { prim: 'DIG', args: [{ int: '2' }] },
                                                            { prim: 'SWAP' },
                                                            { prim: 'DIG', args: [{ int: '2' }] },
                                                            { prim: 'DUP' },
                                                            { prim: 'MUL' },
                                                            { prim: 'PAIR' },
                                                            { prim: 'PAIR' },
                                                            { prim: 'LEFT', args: [{ prim: 'nat' }] }],
                                                            [{ prim: 'DROP' },
                                                              { prim: 'DUP' },
                                                              { prim: 'DIG', args: [{ int: '3' }] },
                                                              { prim: 'MUL' },
                                                              { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '2' }] },
                                                              { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1' }] },
                                                              { prim: 'DIG', args: [{ int: '4' }] },
                                                              { prim: 'SUB' },
                                                              { prim: 'ABS' },
                                                              { prim: 'EDIV' },
                                                              {
                                                                prim: 'IF_NONE',
                                                                args:
                                                                  [[{
                                                                    prim: 'PUSH',
                                                                    args: [{ prim: 'string' }, { string: 'DIV by 0' }]
                                                                  },
                                                                    { prim: 'FAILWITH' }],
                                                                    []]
                                                              },
                                                              { prim: 'CAR' },
                                                              { prim: 'DIG', args: [{ int: '2' }] },
                                                              { prim: 'DUP' },
                                                              { prim: 'MUL' },
                                                              { prim: 'PAIR' },
                                                              { prim: 'PAIR' },
                                                              { prim: 'LEFT', args: [{ prim: 'nat' }] }]]
                                                      }]]
                                              }]]
                                      }]]
                              }]]
                        }]]
                },
                { prim: 'DUP' },
                {
                  prim: 'LAMBDA',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{
                          prim: 'lambda',
                          args:
                            [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }, { prim: 'nat' }]
                        },
                          {
                            prim: 'pair',
                            args:
                              [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }, { prim: 'nat' }]
                          }]
                    },
                      { prim: 'nat' },
                      [{ prim: 'UNPAIR' },
                        { prim: 'SWAP' },
                        { prim: 'UNPAIR' },
                        { prim: 'UNPAIR' },
                        { prim: 'SWAP' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'SUB' },
                        { prim: 'ABS' },
                        { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '10' }] },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'SWAP' },
                        { prim: 'EXEC' },
                        { prim: 'SWAP' },
                        { prim: 'MUL' }]]
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
                            [{
                              prim: 'pair',
                              args:
                                [{
                                  prim: 'pair',
                                  args: [{ prim: 'address' }, { prim: 'option', args: [{ prim: 'address' }] }]
                                },
                                  {
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'address' }] },
                                        {
                                          prim: 'pair',
                                          args: [{ prim: 'nat' }, {
                                            prim: 'map',
                                            args: [{ prim: 'nat' }, { prim: 'nat' }]
                                          }]
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
                                        prim: 'big_map',
                                        args:
                                          [{ prim: 'address' },
                                            {
                                              prim: 'pair',
                                              args:
                                                [{
                                                  prim: 'pair',
                                                  args:
                                                    [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                                      {
                                                        prim: 'pair',
                                                        args:
                                                          [{ prim: 'nat' },
                                                            {
                                                              prim: 'map',
                                                              args:
                                                                [{ prim: 'nat' }, {
                                                                  prim: 'pair',
                                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                }]
                                                            }]
                                                      }]
                                                },
                                                  { prim: 'nat' }]
                                            }]
                                      },
                                        { prim: 'nat' }]
                                  },
                                    { prim: 'big_map', args: [{ prim: 'string' }, { prim: 'bytes' }] }]
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
                                      [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                        { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                  },
                                    { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                              },
                                {
                                  prim: 'pair',
                                  args:
                                    [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'address' }] },
                                      {
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] },
                                            { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                                      }]
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
                                    args: [{ prim: 'address' }, { prim: 'option', args: [{ prim: 'address' }] }]
                                  },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'address' }] },
                                          {
                                            prim: 'pair',
                                            args: [{ prim: 'nat' }, {
                                              prim: 'map',
                                              args: [{ prim: 'nat' }, { prim: 'nat' }]
                                            }]
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
                                          prim: 'big_map',
                                          args:
                                            [{ prim: 'address' },
                                              {
                                                prim: 'pair',
                                                args:
                                                  [{
                                                    prim: 'pair',
                                                    args:
                                                      [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                                        {
                                                          prim: 'pair',
                                                          args:
                                                            [{ prim: 'nat' },
                                                              {
                                                                prim: 'map',
                                                                args:
                                                                  [{ prim: 'nat' }, {
                                                                    prim: 'pair',
                                                                    args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                  }]
                                                              }]
                                                        }]
                                                  },
                                                    { prim: 'nat' }]
                                              }]
                                        },
                                          { prim: 'nat' }]
                                    },
                                      { prim: 'big_map', args: [{ prim: 'string' }, { prim: 'bytes' }] }]
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
                                        [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                          { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                    },
                                      { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                },
                                  {
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'address' }] },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] },
                                              { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                                        }]
                                  }]
                            }]
                      },
                      [{ prim: 'DUP' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'DUP' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CDR' },
                        { prim: 'LEVEL' },
                        { prim: 'COMPARE' },
                        { prim: 'GT' },
                        {
                          prim: 'IF',
                          args:
                            [[{ prim: 'DUP' }, { prim: 'CAR' }, { prim: 'CDR' }, { prim: 'CDR' }],
                              [{ prim: 'LEVEL' }]]
                        },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'SUB' },
                        { prim: 'ABS' },
                        { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                        { prim: 'DUP', args: [{ int: '5' }] },
                        { prim: 'COMPARE' },
                        { prim: 'EQ' },
                        {
                          prim: 'IF',
                          args:
                            [[{ prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'DROP' },
                              { prim: 'DUP', args: [{ int: '3' }] },
                              { prim: 'CDR' },
                              { prim: 'DUP', args: [{ int: '4' }] },
                              { prim: 'CAR' },
                              { prim: 'CDR' },
                              { prim: 'CDR' },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'PAIR' },
                              { prim: 'DUP', args: [{ int: '4' }] },
                              { prim: 'CAR' },
                              { prim: 'CAR' },
                              { prim: 'PAIR' },
                              { prim: 'PAIR' },
                              { prim: 'DUP', args: [{ int: '3' }] },
                              { prim: 'CDR' },
                              { prim: 'CAR' },
                              { prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'MUL' },
                              { prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'CDR' },
                              { prim: 'CDR' },
                              { prim: 'ADD' },
                              { prim: 'SWAP' },
                              { prim: 'DUP' },
                              { prim: 'DUG', args: [{ int: '2' }] },
                              { prim: 'CDR' },
                              { prim: 'CAR' },
                              { prim: 'PAIR' },
                              { prim: 'SWAP' },
                              { prim: 'CAR' },
                              { prim: 'PAIR' }],
                              [{ prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'DUP', args: [{ int: '4' }] },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
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
                                { prim: 'DUP', args: [{ int: '3' }] },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'ADD' },
                                { prim: 'DUP', args: [{ int: '3' }] },
                                { prim: 'CDR' },
                                { prim: 'DUP', args: [{ int: '4' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'DUP' },
                                { prim: 'CDR' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' }]]
                        },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CDR' },
                        { prim: 'CDR' },
                        { prim: 'SWAP' },
                        { prim: 'PAIR' },
                        { prim: 'SWAP' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' }]]
                },
                { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '24' }] },
                {
                  prim: 'LAMBDA',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'address' },
                          {
                            prim: 'big_map',
                            args:
                              [{ prim: 'address' },
                                {
                                  prim: 'pair',
                                  args:
                                    [{
                                      prim: 'pair',
                                      args:
                                        [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                          {
                                            prim: 'pair',
                                            args:
                                              [{ prim: 'nat' },
                                                {
                                                  prim: 'map',
                                                  args:
                                                    [{ prim: 'nat' }, {
                                                      prim: 'pair',
                                                      args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                    }]
                                                }]
                                          }]
                                    },
                                      { prim: 'nat' }]
                                }]
                          }]
                    },
                      {
                        prim: 'pair',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                {
                                  prim: 'pair',
                                  args:
                                    [{ prim: 'nat' },
                                      {
                                        prim: 'map',
                                        args:
                                          [{ prim: 'nat' }, { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                      }]
                                }]
                          },
                            { prim: 'nat' }]
                      },
                      [{ prim: 'UNPAIR' },
                        { prim: 'GET' },
                        {
                          prim: 'IF_NONE',
                          args:
                            [[{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                              {
                                prim: 'EMPTY_MAP',
                                args:
                                  [{ prim: 'nat' }, { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                              },
                              { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                              { prim: 'PAIR' },
                              { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                              { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                              { prim: 'PAIR' },
                              { prim: 'PAIR' },
                              { prim: 'PAIR' }],
                              []]
                        }]]
                },
                { prim: 'DUP', args: [{ int: '7' }] },
                {
                  prim: 'LAMBDA',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{
                          prim: 'lambda',
                          args:
                            [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }, { prim: 'nat' }]
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
                                      [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'nat' },
                                              {
                                                prim: 'map',
                                                args:
                                                  [{ prim: 'nat' }, {
                                                    prim: 'pair',
                                                    args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                  }]
                                              }]
                                        }]
                                  },
                                    { prim: 'nat' }]
                              },
                                {
                                  prim: 'pair',
                                  args:
                                    [{
                                      prim: 'pair',
                                      args:
                                        [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                          { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                    },
                                      { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                }]
                          }]
                    },
                      { prim: 'nat' },
                      [{ prim: 'UNPAIR' },
                        { prim: 'SWAP' },
                        { prim: 'UNPAIR' },
                        { prim: 'DUP' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'SWAP' },
                        { prim: 'EXEC' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'MUL' },
                        { prim: 'SWAP' },
                        { prim: 'CDR' },
                        { prim: 'ADD' }]]
                },
                { prim: 'SWAP' },
                { prim: 'APPLY' },
                { prim: 'DUP', args: [{ int: '4' }] },
                { prim: 'DUP', args: [{ int: '3' }] },
                { prim: 'DUP', args: [{ int: '3' }] },
                { prim: 'PAIR', args: [{ int: '3' }] },
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
                              prim: 'lambda',
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
                                            [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                              {
                                                prim: 'pair',
                                                args:
                                                  [{ prim: 'nat' },
                                                    {
                                                      prim: 'map',
                                                      args:
                                                        [{ prim: 'nat' }, {
                                                          prim: 'pair',
                                                          args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                        }]
                                                    }]
                                              }]
                                        },
                                          { prim: 'nat' }]
                                    },
                                      {
                                        prim: 'pair',
                                        args:
                                          [{
                                            prim: 'pair',
                                            args:
                                              [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                                { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                          },
                                            { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                      }]
                                },
                                  { prim: 'nat' }]
                            },
                              {
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'lambda',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'address' },
                                            {
                                              prim: 'big_map',
                                              args:
                                                [{ prim: 'address' },
                                                  {
                                                    prim: 'pair',
                                                    args:
                                                      [{
                                                        prim: 'pair',
                                                        args:
                                                          [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                                            {
                                                              prim: 'pair',
                                                              args:
                                                                [{ prim: 'nat' },
                                                                  {
                                                                    prim: 'map',
                                                                    args:
                                                                      [{ prim: 'nat' }, {
                                                                        prim: 'pair',
                                                                        args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                      }]
                                                                  }]
                                                            }]
                                                      },
                                                        { prim: 'nat' }]
                                                  }]
                                            }]
                                      },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{
                                              prim: 'pair',
                                              args:
                                                [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                                  {
                                                    prim: 'pair',
                                                    args:
                                                      [{ prim: 'nat' },
                                                        {
                                                          prim: 'map',
                                                          args:
                                                            [{ prim: 'nat' }, {
                                                              prim: 'pair',
                                                              args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                            }]
                                                        }]
                                                  }]
                                            },
                                              { prim: 'nat' }]
                                        }]
                                  },
                                    {
                                      prim: 'lambda',
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
                                                      args: [{ prim: 'address' }, {
                                                        prim: 'option',
                                                        args: [{ prim: 'address' }]
                                                      }]
                                                    },
                                                      {
                                                        prim: 'pair',
                                                        args:
                                                          [{
                                                            prim: 'pair',
                                                            args: [{ prim: 'nat' }, { prim: 'address' }]
                                                          },
                                                            {
                                                              prim: 'pair',
                                                              args: [{ prim: 'nat' }, {
                                                                prim: 'map',
                                                                args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                              }]
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
                                                            prim: 'big_map',
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
                                                                          args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                        },
                                                                          {
                                                                            prim: 'pair',
                                                                            args:
                                                                              [{ prim: 'nat' },
                                                                                {
                                                                                  prim: 'map',
                                                                                  args:
                                                                                    [{ prim: 'nat' }, {
                                                                                      prim: 'pair',
                                                                                      args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                                    }]
                                                                                }]
                                                                          }]
                                                                    },
                                                                      { prim: 'nat' }]
                                                                }]
                                                          },
                                                            { prim: 'nat' }]
                                                      },
                                                        {
                                                          prim: 'big_map',
                                                          args: [{ prim: 'string' }, { prim: 'bytes' }]
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
                                                          [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                                            { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                                      },
                                                        { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                                  },
                                                    {
                                                      prim: 'pair',
                                                      args:
                                                        [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'address' }] },
                                                          {
                                                            prim: 'pair',
                                                            args:
                                                              [{
                                                                prim: 'pair',
                                                                args: [{ prim: 'address' }, { prim: 'nat' }]
                                                              },
                                                                {
                                                                  prim: 'pair',
                                                                  args: [{ prim: 'address' }, { prim: 'nat' }]
                                                                }]
                                                          }]
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
                                                        args: [{ prim: 'address' }, {
                                                          prim: 'option',
                                                          args: [{ prim: 'address' }]
                                                        }]
                                                      },
                                                        {
                                                          prim: 'pair',
                                                          args:
                                                            [{
                                                              prim: 'pair',
                                                              args: [{ prim: 'nat' }, { prim: 'address' }]
                                                            },
                                                              {
                                                                prim: 'pair',
                                                                args: [{ prim: 'nat' }, {
                                                                  prim: 'map',
                                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                }]
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
                                                              prim: 'big_map',
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
                                                                            args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                          },
                                                                            {
                                                                              prim: 'pair',
                                                                              args:
                                                                                [{ prim: 'nat' },
                                                                                  {
                                                                                    prim: 'map',
                                                                                    args:
                                                                                      [{ prim: 'nat' }, {
                                                                                        prim: 'pair',
                                                                                        args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                                      }]
                                                                                  }]
                                                                            }]
                                                                      },
                                                                        { prim: 'nat' }]
                                                                  }]
                                                            },
                                                              { prim: 'nat' }]
                                                        },
                                                          {
                                                            prim: 'big_map',
                                                            args: [{ prim: 'string' }, { prim: 'bytes' }]
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
                                                            [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                                              {
                                                                prim: 'pair',
                                                                args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                              }]
                                                        },
                                                          { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                                    },
                                                      {
                                                        prim: 'pair',
                                                        args:
                                                          [{
                                                            prim: 'pair',
                                                            args: [{ prim: 'nat' }, { prim: 'address' }]
                                                          },
                                                            {
                                                              prim: 'pair',
                                                              args:
                                                                [{
                                                                  prim: 'pair',
                                                                  args: [{ prim: 'address' }, { prim: 'nat' }]
                                                                },
                                                                  {
                                                                    prim: 'pair',
                                                                    args: [{ prim: 'address' }, { prim: 'nat' }]
                                                                  }]
                                                            }]
                                                      }]
                                                }]
                                          }]
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
                                        args: [{ prim: 'address' }, { prim: 'option', args: [{ prim: 'address' }] }]
                                      },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'address' }] },
                                              {
                                                prim: 'pair',
                                                args: [{ prim: 'nat' }, {
                                                  prim: 'map',
                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                }]
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
                                              prim: 'big_map',
                                              args:
                                                [{ prim: 'address' },
                                                  {
                                                    prim: 'pair',
                                                    args:
                                                      [{
                                                        prim: 'pair',
                                                        args:
                                                          [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                                            {
                                                              prim: 'pair',
                                                              args:
                                                                [{ prim: 'nat' },
                                                                  {
                                                                    prim: 'map',
                                                                    args:
                                                                      [{ prim: 'nat' }, {
                                                                        prim: 'pair',
                                                                        args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                      }]
                                                                  }]
                                                            }]
                                                      },
                                                        { prim: 'nat' }]
                                                  }]
                                            },
                                              { prim: 'nat' }]
                                        },
                                          { prim: 'big_map', args: [{ prim: 'string' }, { prim: 'bytes' }] }]
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
                                            [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                              { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                        },
                                          { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                    },
                                      {
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'address' }] },
                                            {
                                              prim: 'pair',
                                              args:
                                                [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] },
                                                  { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                                            }]
                                      }]
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
                                  [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{ prim: 'nat' },
                                          {
                                            prim: 'map',
                                            args:
                                              [{ prim: 'nat' }, {
                                                prim: 'pair',
                                                args: [{ prim: 'nat' }, { prim: 'nat' }]
                                              }]
                                          }]
                                    }]
                              },
                                { prim: 'nat' }]
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
                                          args: [{ prim: 'address' }, { prim: 'option', args: [{ prim: 'address' }] }]
                                        },
                                          {
                                            prim: 'pair',
                                            args:
                                              [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'address' }] },
                                                {
                                                  prim: 'pair',
                                                  args: [{ prim: 'nat' }, {
                                                    prim: 'map',
                                                    args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                  }]
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
                                                prim: 'big_map',
                                                args:
                                                  [{ prim: 'address' },
                                                    {
                                                      prim: 'pair',
                                                      args:
                                                        [{
                                                          prim: 'pair',
                                                          args:
                                                            [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                                              {
                                                                prim: 'pair',
                                                                args:
                                                                  [{ prim: 'nat' },
                                                                    {
                                                                      prim: 'map',
                                                                      args:
                                                                        [{ prim: 'nat' }, {
                                                                          prim: 'pair',
                                                                          args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                        }]
                                                                    }]
                                                              }]
                                                        },
                                                          { prim: 'nat' }]
                                                    }]
                                              },
                                                { prim: 'nat' }]
                                          },
                                            { prim: 'big_map', args: [{ prim: 'string' }, { prim: 'bytes' }] }]
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
                                              [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                                { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                          },
                                            { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                      },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'address' }] },
                                              {
                                                prim: 'pair',
                                                args:
                                                  [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] },
                                                    { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                                              }]
                                        }]
                                  }]
                            }]
                      },
                      [{ prim: 'UNPAIR' },
                        { prim: 'UNPAIR', args: [{ int: '3' }] },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'SWAP' },
                        { prim: 'EXEC' },
                        { prim: 'DUP' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'SENDER' },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'SWAP' },
                        { prim: 'EXEC' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '4' }] },
                        { prim: 'SWAP' },
                        { prim: 'EXEC' },
                        { prim: 'SWAP' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'DUP' },
                        { prim: 'CDR' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CDR' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' }]]
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
                            [{
                              prim: 'pair',
                              args:
                                [{
                                  prim: 'pair',
                                  args: [{ prim: 'address' }, { prim: 'option', args: [{ prim: 'address' }] }]
                                },
                                  {
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'address' }] },
                                        {
                                          prim: 'pair',
                                          args: [{ prim: 'nat' }, {
                                            prim: 'map',
                                            args: [{ prim: 'nat' }, { prim: 'nat' }]
                                          }]
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
                                        prim: 'big_map',
                                        args:
                                          [{ prim: 'address' },
                                            {
                                              prim: 'pair',
                                              args:
                                                [{
                                                  prim: 'pair',
                                                  args:
                                                    [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                                      {
                                                        prim: 'pair',
                                                        args:
                                                          [{ prim: 'nat' },
                                                            {
                                                              prim: 'map',
                                                              args:
                                                                [{ prim: 'nat' }, {
                                                                  prim: 'pair',
                                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                }]
                                                            }]
                                                      }]
                                                },
                                                  { prim: 'nat' }]
                                            }]
                                      },
                                        { prim: 'nat' }]
                                  },
                                    { prim: 'big_map', args: [{ prim: 'string' }, { prim: 'bytes' }] }]
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
                                      [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                        { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                  },
                                    { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                              },
                                {
                                  prim: 'pair',
                                  args:
                                    [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'address' }] },
                                      {
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] },
                                            { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                                      }]
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
                                    args: [{ prim: 'address' }, { prim: 'option', args: [{ prim: 'address' }] }]
                                  },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'address' }] },
                                          {
                                            prim: 'pair',
                                            args: [{ prim: 'nat' }, {
                                              prim: 'map',
                                              args: [{ prim: 'nat' }, { prim: 'nat' }]
                                            }]
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
                                          prim: 'big_map',
                                          args:
                                            [{ prim: 'address' },
                                              {
                                                prim: 'pair',
                                                args:
                                                  [{
                                                    prim: 'pair',
                                                    args:
                                                      [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                                        {
                                                          prim: 'pair',
                                                          args:
                                                            [{ prim: 'nat' },
                                                              {
                                                                prim: 'map',
                                                                args:
                                                                  [{ prim: 'nat' }, {
                                                                    prim: 'pair',
                                                                    args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                  }]
                                                              }]
                                                        }]
                                                  },
                                                    { prim: 'nat' }]
                                              }]
                                        },
                                          { prim: 'nat' }]
                                    },
                                      { prim: 'big_map', args: [{ prim: 'string' }, { prim: 'bytes' }] }]
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
                                        [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                          { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                    },
                                      { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                },
                                  {
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'address' }] },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] },
                                              { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                                        }]
                                  }]
                            }]
                      },
                      [{ prim: 'DUP' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'SENDER' },
                        { prim: 'COMPARE' },
                        { prim: 'NEQ' },
                        {
                          prim: 'IF',
                          args:
                            [[{ prim: 'DROP' },
                              { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'NOT_AN_ADMIN' }] },
                              { prim: 'FAILWITH' }],
                              []]
                        }]]
                },
                { prim: 'DIG', args: [{ int: '12' }] },
                { prim: 'UNPAIR' },
                {
                  prim: 'IF_LEFT',
                  args:
                    [[{ prim: 'DIG', args: [{ int: '3' }] },
                      { prim: 'DIG', args: [{ int: '4' }] },
                      { prim: 'DIG', args: [{ int: '5' }] },
                      { prim: 'DIG', args: [{ int: '6' }] },
                      { prim: 'DIG', args: [{ int: '7' }] },
                      { prim: 'DIG', args: [{ int: '8' }] },
                      { prim: 'DIG', args: [{ int: '9' }] },
                      { prim: 'DIG', args: [{ int: '11' }] },
                      { prim: 'DIG', args: [{ int: '13' }] },
                      { prim: 'DROP', args: [{ int: '9' }] },
                      {
                        prim: 'IF_LEFT',
                        args:
                          [[{ prim: 'DIG', args: [{ int: '3' }] },
                            { prim: 'DIG', args: [{ int: '4' }] },
                            { prim: 'DROP', args: [{ int: '2' }] },
                            {
                              prim: 'IF_LEFT',
                              args:
                                [[{ prim: 'SWAP' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DUP' },
                                  { prim: 'CDR' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'DUP', args: [{ int: '3' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '4' }] },
                                  { prim: 'SOME' },
                                  { prim: 'DIG', args: [{ int: '4' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'NIL', args: [{ prim: 'operation' }] },
                                  { prim: 'PAIR' }],
                                  [{ prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'DROP', args: [{ int: '2' }] },
                                    { prim: 'DUP' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    {
                                      prim: 'IF_NONE',
                                      args:
                                        [[{ prim: 'DROP' },
                                          { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'NO_PENDING_ADMIN' }] },
                                          { prim: 'FAILWITH' }],
                                          [{ prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CDR' },
                                            { prim: 'DUP', args: [{ int: '3' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'DUP', args: [{ int: '4' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'DIG', args: [{ int: '4' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'DIG', args: [{ int: '4' }] },
                                            { prim: 'SWAP' },
                                            { prim: 'DROP' },
                                            { prim: 'SENDER' },
                                            { prim: 'SWAP' },
                                            { prim: 'COMPARE' },
                                            { prim: 'NEQ' },
                                            {
                                              prim: 'IF',
                                              args:
                                                [[{
                                                  prim: 'PUSH',
                                                  args: [{ prim: 'string' }, { string: 'NOT_PENDING_ADMIN' }]
                                                },
                                                  { prim: 'FAILWITH' }],
                                                  [{ prim: 'NONE', args: [{ prim: 'address' }] },
                                                    { prim: 'SENDER' },
                                                    { prim: 'PAIR' }]]
                                            },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' }]]
                                    },
                                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                                    { prim: 'PAIR' }]]
                            }],
                            [{ prim: 'SWAP' },
                              { prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'SWAP' },
                              { prim: 'EXEC' },
                              { prim: 'SWAP' },
                              {
                                prim: 'IF_LEFT',
                                args:
                                  [[{
                                    prim: 'IF_LEFT',
                                    args:
                                      [[{ prim: 'DIG', args: [{ int: '3' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'EXEC' },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'CDR' },
                                        { prim: 'DUP', args: [{ int: '3' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'DUP', args: [{ int: '4' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'UNPAIR' },
                                        { prim: 'CDR' },
                                        { prim: 'DIG', args: [{ int: '4' }] },
                                        { prim: 'PAIR' },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '3' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'PAIR' },
                                        { prim: 'PAIR' },
                                        { prim: 'PAIR' },
                                        { prim: 'NIL', args: [{ prim: 'operation' }] },
                                        { prim: 'PAIR' }],
                                        [{ prim: 'DIG', args: [{ int: '2' }] },
                                          { prim: 'DIG', args: [{ int: '3' }] },
                                          { prim: 'DROP', args: [{ int: '2' }] },
                                          { prim: 'SWAP' },
                                          { prim: 'DUP' },
                                          { prim: 'DUG', args: [{ int: '2' }] },
                                          { prim: 'CDR' },
                                          { prim: 'DUP', args: [{ int: '3' }] },
                                          { prim: 'CAR' },
                                          { prim: 'CDR' },
                                          { prim: 'DUP', args: [{ int: '4' }] },
                                          { prim: 'CAR' },
                                          { prim: 'CAR' },
                                          { prim: 'CDR' },
                                          { prim: 'DUP' },
                                          { prim: 'CDR' },
                                          { prim: 'CDR' },
                                          { prim: 'DIG', args: [{ int: '4' }] },
                                          { prim: 'PAIR' },
                                          { prim: 'SWAP' },
                                          { prim: 'CAR' },
                                          { prim: 'PAIR' },
                                          { prim: 'DIG', args: [{ int: '3' }] },
                                          { prim: 'CAR' },
                                          { prim: 'CAR' },
                                          { prim: 'CAR' },
                                          { prim: 'PAIR' },
                                          { prim: 'PAIR' },
                                          { prim: 'PAIR' },
                                          { prim: 'NIL', args: [{ prim: 'operation' }] },
                                          { prim: 'PAIR' }]]
                                  }],
                                    [{ prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'DROP', args: [{ int: '2' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'CDR' },
                                      { prim: 'DUP', args: [{ int: '3' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'DUP', args: [{ int: '4' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'PAIR' },
                                      { prim: 'SWAP' },
                                      { prim: 'CAR' },
                                      { prim: 'PAIR' },
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
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
                          [[{ prim: 'DIG', args: [{ int: '3' }] },
                            { prim: 'DIG', args: [{ int: '4' }] },
                            { prim: 'DIG', args: [{ int: '5' }] },
                            { prim: 'DIG', args: [{ int: '9' }] },
                            { prim: 'DIG', args: [{ int: '13' }] },
                            { prim: 'DROP', args: [{ int: '5' }] },
                            { prim: 'SWAP' },
                            { prim: 'DIG', args: [{ int: '2' }] },
                            { prim: 'SWAP' },
                            { prim: 'EXEC' },
                            { prim: 'SWAP' },
                            {
                              prim: 'IF_LEFT',
                              args:
                                [[{ prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'DIG', args: [{ int: '4' }] },
                                  { prim: 'DIG', args: [{ int: '6' }] },
                                  { prim: 'DIG', args: [{ int: '7' }] },
                                  { prim: 'DROP', args: [{ int: '5' }] },
                                  { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'BAD_DURATION' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'PAIR' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CDR' },
                                  { prim: 'CDR' },
                                  { prim: 'UNPAIR' },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CDR' },
                                  { prim: 'CAR' },
                                  { prim: 'PAIR' },
                                  { prim: 'SWAP' },
                                  { prim: 'CAR' },
                                  { prim: 'PAIR' },
                                  { prim: 'NIL', args: [{ prim: 'operation' }] },
                                  { prim: 'PAIR' }],
                                  [{ prim: 'DIG', args: [{ int: '7' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'PAIR' },
                                    { prim: 'DIG', args: [{ int: '5' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'EXEC' },
                                    { prim: 'SWAP' },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'EXEC' },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '2' }] },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '2' }] },
                                    { prim: 'CDR' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'CDR' },
                                    { prim: 'LEVEL' },
                                    { prim: 'COMPARE' },
                                    { prim: 'LE' },
                                    {
                                      prim: 'IF',
                                      args:
                                        [[{ prim: 'SWAP' },
                                          { prim: 'DUP' },
                                          { prim: 'DUG', args: [{ int: '2' }] },
                                          { prim: 'CDR' },
                                          { prim: 'CAR' },
                                          { prim: 'CDR' },
                                          { prim: 'CAR' },
                                          { prim: 'LEVEL' },
                                          { prim: 'DUP', args: [{ int: '4' }] },
                                          { prim: 'CDR' },
                                          { prim: 'CAR' },
                                          { prim: 'CAR' },
                                          { prim: 'CDR' },
                                          { prim: 'CDR' },
                                          { prim: 'PAIR' },
                                          { prim: 'DIG', args: [{ int: '7' }] },
                                          { prim: 'SWAP' },
                                          { prim: 'EXEC' },
                                          { prim: 'MUL' },
                                          { prim: 'DUP', args: [{ int: '3' }] },
                                          { prim: 'CDR' },
                                          { prim: 'CAR' },
                                          { prim: 'CDR' },
                                          { prim: 'CDR' },
                                          { prim: 'DIG', args: [{ int: '5' }] },
                                          { prim: 'DUP', args: [{ int: '5' }] },
                                          { prim: 'CDR' },
                                          { prim: 'CAR' },
                                          { prim: 'CAR' },
                                          { prim: 'CAR' },
                                          { prim: 'CDR' },
                                          { prim: 'DIG', args: [{ int: '4' }] },
                                          { prim: 'PAIR' },
                                          { prim: 'PAIR' },
                                          { prim: 'DIG', args: [{ int: '5' }] },
                                          { prim: 'SWAP' },
                                          { prim: 'EXEC' },
                                          { prim: 'ADD' },
                                          { prim: 'ADD' }],
                                          [{ prim: 'DIG', args: [{ int: '5' }] },
                                            { prim: 'DROP' },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CDR' },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'DIG', args: [{ int: '4' }] },
                                            { prim: 'DUP', args: [{ int: '4' }] },
                                            { prim: 'CDR' },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'DIG', args: [{ int: '3' }] },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'DIG', args: [{ int: '4' }] },
                                            { prim: 'SWAP' },
                                            { prim: 'EXEC' },
                                            { prim: 'ADD' }]]
                                    },
                                    { prim: 'SWAP' },
                                    { prim: 'CDR' },
                                    { prim: 'CDR' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'SWAP' },
                                    { prim: 'EDIV' },
                                    {
                                      prim: 'IF_NONE',
                                      args:
                                        [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'Bad amount' }] },
                                          { prim: 'FAILWITH' }],
                                          []]
                                    },
                                    { prim: 'UNPAIR' },
                                    { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '2' }] },
                                    { prim: 'COMPARE' },
                                    { prim: 'EQ' },
                                    {
                                      prim: 'IF',
                                      args:
                                        [[{ prim: 'DROP', args: [{ int: '2' }] },
                                          { prim: 'NIL', args: [{ prim: 'operation' }] },
                                          { prim: 'PAIR' }],
                                          [{ prim: 'DUP', args: [{ int: '3' }] },
                                            { prim: 'CDR' },
                                            { prim: 'CAR' },
                                            { prim: 'DUP' },
                                            { prim: 'CDR' },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'LEVEL' },
                                            { prim: 'PAIR' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'DUP' },
                                            { prim: 'CDR' },
                                            { prim: 'LEVEL' },
                                            { prim: 'DUP', args: [{ int: '6' }] },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'ADD' },
                                            { prim: 'DUP', args: [{ int: '3' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'DUP' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'PAIR' },
                                            { prim: 'SWAP' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CDR' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'SWAP' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'SWAP' },
                                            { prim: 'PAIR' },
                                            { prim: 'SWAP' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'NIL', args: [{ prim: 'operation' }] },
                                            { prim: 'PAIR' }]]
                                    }]]
                            }],
                            [{ prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'DIG', args: [{ int: '8' }] },
                              { prim: 'DROP', args: [{ int: '2' }] },
                              {
                                prim: 'IF_LEFT',
                                args:
                                  [[{ prim: 'DIG', args: [{ int: '9' }] },
                                    { prim: 'DROP' },
                                    {
                                      prim: 'IF_LEFT',
                                      args:
                                        [[{ prim: 'DIG', args: [{ int: '2' }] },
                                          { prim: 'DIG', args: [{ int: '8' }] },
                                          { prim: 'DIG', args: [{ int: '9' }] },
                                          { prim: 'DROP', args: [{ int: '4' }] },
                                          { prim: 'DIG', args: [{ int: '4' }] },
                                          { prim: 'SWAP' },
                                          { prim: 'EXEC' },
                                          { prim: 'DUP' },
                                          { prim: 'CAR' },
                                          { prim: 'CDR' },
                                          { prim: 'CAR' },
                                          { prim: 'CAR' },
                                          { prim: 'SENDER' },
                                          { prim: 'PAIR' },
                                          { prim: 'DIG', args: [{ int: '3' }] },
                                          { prim: 'SWAP' },
                                          { prim: 'EXEC' },
                                          { prim: 'SWAP' },
                                          { prim: 'DUP' },
                                          { prim: 'DUG', args: [{ int: '2' }] },
                                          { prim: 'CDR' },
                                          { prim: 'CAR' },
                                          { prim: 'SWAP' },
                                          { prim: 'DUP' },
                                          { prim: 'DUG', args: [{ int: '2' }] },
                                          { prim: 'PAIR' },
                                          { prim: 'DIG', args: [{ int: '3' }] },
                                          { prim: 'SWAP' },
                                          { prim: 'EXEC' },
                                          { prim: 'DUP', args: [{ int: '3' }] },
                                          { prim: 'CDR' },
                                          { prim: 'CAR' },
                                          { prim: 'CAR' },
                                          { prim: 'CAR' },
                                          { prim: 'CDR' },
                                          { prim: 'DIG', args: [{ int: '4' }] },
                                          { prim: 'DIG', args: [{ int: '2' }] },
                                          { prim: 'SWAP' },
                                          { prim: 'DIG', args: [{ int: '2' }] },
                                          { prim: 'SUB' },
                                          { prim: 'ABS' },
                                          { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '10' }] },
                                          { prim: 'PAIR' },
                                          { prim: 'DIG', args: [{ int: '4' }] },
                                          { prim: 'SWAP' },
                                          { prim: 'EXEC' },
                                          { prim: 'SWAP' },
                                          { prim: 'EDIV' },
                                          {
                                            prim: 'IF_NONE',
                                            args:
                                              [[{
                                                prim: 'PUSH',
                                                args: [{ prim: 'string' }, { string: 'bad_exponent' }]
                                              },
                                                { prim: 'FAILWITH' }],
                                                []]
                                          },
                                          { prim: 'UNPAIR' },
                                          { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                          { prim: 'SWAP' },
                                          { prim: 'DUP' },
                                          { prim: 'DUG', args: [{ int: '2' }] },
                                          { prim: 'COMPARE' },
                                          { prim: 'EQ' },
                                          {
                                            prim: 'IF',
                                            args:
                                              [[{ prim: 'SWAP' },
                                                { prim: 'DIG', args: [{ int: '2' }] },
                                                { prim: 'DIG', args: [{ int: '4' }] },
                                                { prim: 'DROP', args: [{ int: '4' }] },
                                                { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                { prim: 'PAIR' }],
                                                [{ prim: 'DUP', args: [{ int: '4' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'DIG', args: [{ int: '2' }] },
                                                  { prim: 'DIG', args: [{ int: '3' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'DUP' },
                                                  { prim: 'CDR' },
                                                  { prim: 'SWAP' },
                                                  { prim: 'DUP' },
                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'DUP', args: [{ int: '6' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'DIG', args: [{ int: '2' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'SOME' },
                                                  { prim: 'SENDER' },
                                                  { prim: 'UPDATE' },
                                                  { prim: 'SWAP' },
                                                  { prim: 'DUP', args: [{ int: '3' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'SENDER' },
                                                  { prim: 'DUP', args: [{ int: '4' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'DIG', args: [{ int: '3' }] },
                                                  { prim: 'SWAP' },
                                                  { prim: 'EXEC' },
                                                  { prim: 'DUP', args: [{ int: '3' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'DUP', args: [{ int: '4' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'DUP', args: [{ int: '5' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'DIG', args: [{ int: '4' }] },
                                                  { prim: 'PAIR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'DIG', args: [{ int: '3' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                  { prim: 'DIG', args: [{ int: '2' }] },
                                                  { prim: 'CONS' },
                                                  { prim: 'PAIR' }]]
                                          }],
                                          [{ prim: 'DIG', args: [{ int: '3' }] },
                                            { prim: 'DIG', args: [{ int: '4' }] },
                                            { prim: 'DIG', args: [{ int: '5' }] },
                                            { prim: 'DIG', args: [{ int: '6' }] },
                                            { prim: 'DIG', args: [{ int: '7' }] },
                                            { prim: 'DROP', args: [{ int: '5' }] },
                                            { prim: 'DIG', args: [{ int: '4' }] },
                                            { prim: 'SWAP' },
                                            { prim: 'PAIR' },
                                            { prim: 'DIG', args: [{ int: '3' }] },
                                            { prim: 'SWAP' },
                                            { prim: 'EXEC' },
                                            { prim: 'SWAP' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'SWAP' },
                                            { prim: 'EXEC' },
                                            { prim: 'UNPAIR' },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'CAR' },
                                            { prim: 'DUP', args: [{ int: '4' }] },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'DUP' },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'LEVEL' },
                                            { prim: 'DUP', args: [{ int: '4' }] },
                                            { prim: 'PAIR' },
                                            { prim: 'DUP', args: [{ int: '3' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'SWAP' },
                                            { prim: 'SOME' },
                                            { prim: 'SWAP' },
                                            { prim: 'UPDATE' },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CDR' },
                                            { prim: 'DUP', args: [{ int: '3' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1' }] },
                                            { prim: 'DUP', args: [{ int: '5' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'ADD' },
                                            { prim: 'DUP', args: [{ int: '5' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'DUP' },
                                            { prim: 'CDR' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
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
                                            { prim: 'PAIR' },
                                            { prim: 'DUP' },
                                            { prim: 'CDR' },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'DUP', args: [{ int: '5' }] },
                                            { prim: 'DIG', args: [{ int: '4' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'ADD' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'DUP', args: [{ int: '3' }] },
                                            { prim: 'CDR' },
                                            { prim: 'DUP', args: [{ int: '4' }] },
                                            { prim: 'CAR' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'SOME' },
                                            { prim: 'SENDER' },
                                            { prim: 'UPDATE' },
                                            { prim: 'PAIR' },
                                            { prim: 'SWAP' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'CDR' },
                                            { prim: 'ADD' },
                                            { prim: 'SWAP' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '3' }] },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'PAIR' },
                                            { prim: 'SELF_ADDRESS' },
                                            { prim: 'SENDER' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'DIG', args: [{ int: '3' }] },
                                            { prim: 'SWAP' },
                                            { prim: 'EXEC' },
                                            { prim: 'DUP', args: [{ int: '3' }] },
                                            { prim: 'CDR' },
                                            { prim: 'DUP', args: [{ int: '4' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'DIG', args: [{ int: '3' }] },
                                            { prim: 'PAIR' },
                                            { prim: 'DIG', args: [{ int: '3' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'NIL', args: [{ prim: 'operation' }] },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'CONS' },
                                            { prim: 'PAIR' }]]
                                    }],
                                    [{ prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'DIG', args: [{ int: '4' }] },
                                      { prim: 'DIG', args: [{ int: '5' }] },
                                      { prim: 'DIG', args: [{ int: '6' }] },
                                      { prim: 'DIG', args: [{ int: '7' }] },
                                      { prim: 'DROP', args: [{ int: '5' }] },
                                      { prim: 'UNPAIR' },
                                      { prim: 'DIG', args: [{ int: '6' }] },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'PAIR' },
                                      { prim: 'DIG', args: [{ int: '4' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'EXEC' },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'EXEC' },
                                      { prim: 'UNPAIR' },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'DUP', args: [{ int: '4' }] },
                                      { prim: 'PAIR' },
                                      { prim: 'DIG', args: [{ int: '4' }] },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'UNPAIR' },
                                      { prim: 'DUP', args: [{ int: '4' }] },
                                      { prim: 'DUP', args: [{ int: '4' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'CDR' },
                                      { prim: 'SWAP' },
                                      { prim: 'GET' },
                                      {
                                        prim: 'IF_NONE',
                                        args:
                                          [[{
                                            prim: 'PUSH',
                                            args: [{ prim: 'string' }, { string: 'WRONG_STAKE_INDEX' }]
                                          },
                                            { prim: 'FAILWITH' }],
                                            []]
                                      },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'CAR' },
                                      { prim: 'PAIR' },
                                      { prim: 'DUP', args: [{ int: '9' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'EXEC' },
                                      { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'COMPARE' },
                                      { prim: 'EQ' },
                                      {
                                        prim: 'IF',
                                        args:
                                          [[{ prim: 'DUP', args: [{ int: '4' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'DIG', args: [{ int: '5' }] },
                                            {
                                              prim: 'NONE',
                                              args: [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                            },
                                            { prim: 'SWAP' },
                                            { prim: 'UPDATE' }],
                                            [{ prim: 'DUP', args: [{ int: '4' }] },
                                              { prim: 'CAR' },
                                              { prim: 'CDR' },
                                              { prim: 'CDR' },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'CDR' },
                                              { prim: 'DUP', args: [{ int: '4' }] },
                                              { prim: 'DUP', args: [{ int: '4' }] },
                                              { prim: 'CAR' },
                                              { prim: 'PAIR' },
                                              { prim: 'DUP', args: [{ int: '11' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'EXEC' },
                                              { prim: 'PAIR' },
                                              { prim: 'SOME' },
                                              { prim: 'DIG', args: [{ int: '6' }] },
                                              { prim: 'UPDATE' }]]
                                      },
                                      { prim: 'DUP', args: [{ int: '5' }] },
                                      { prim: 'CDR' },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP', args: [{ int: '6' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'PAIR' },
                                      { prim: 'DUP', args: [{ int: '6' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'PAIR' },
                                      { prim: 'PAIR' },
                                      { prim: 'DUP' },
                                      { prim: 'CDR' },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'DUP', args: [{ int: '5' }] },
                                      { prim: 'DIG', args: [{ int: '7' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'PAIR' },
                                      { prim: 'DUP', args: [{ int: '10' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'EXEC' },
                                      { prim: 'PAIR' },
                                      { prim: 'PAIR' },
                                      { prim: 'PAIR' },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'DUP', args: [{ int: '4' }] },
                                      { prim: 'CDR' },
                                      { prim: 'PAIR' },
                                      { prim: 'DUP', args: [{ int: '7' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'EXEC' },
                                      { prim: 'DUP', args: [{ int: '4' }] },
                                      { prim: 'CAR' },
                                      { prim: 'PAIR' },
                                      { prim: 'CDR' },
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'CAR' },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'SOME' },
                                      { prim: 'SENDER' },
                                      { prim: 'UPDATE' },
                                      { prim: 'PAIR' },
                                      { prim: 'SWAP' },
                                      { prim: 'CDR' },
                                      { prim: 'DUP', args: [{ int: '3' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'DIG', args: [{ int: '4' }] },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1' }] },
                                      { prim: 'DUP', args: [{ int: '3' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'LEVEL' },
                                      { prim: 'PAIR' },
                                      { prim: 'DUP', args: [{ int: '8' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'EXEC' },
                                      { prim: 'EDIV' },
                                      {
                                        prim: 'IF_NONE',
                                        args:
                                          [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'DIV by 0' }] },
                                            { prim: 'FAILWITH' }],
                                            []]
                                      },
                                      { prim: 'CAR' },
                                      { prim: 'ADD' },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'CDR' },
                                      { prim: 'CDR' },
                                      { prim: 'SWAP' },
                                      { prim: 'GET' },
                                      {
                                        prim: 'IF_NONE',
                                        args: [[{ prim: 'CDR' }, { prim: 'CAR' }], [{ prim: 'SWAP' }, { prim: 'DROP' }]]
                                      },
                                      { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'COMPARE' },
                                      { prim: 'EQ' },
                                      {
                                        prim: 'IF',
                                        args:
                                          [[{ prim: 'DROP' }, { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] }],
                                            [{ prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'EDIV' },
                                              {
                                                prim: 'IF_NONE',
                                                args:
                                                  [[{
                                                    prim: 'PUSH',
                                                    args: [{ prim: 'string' }, { string: 'DIV by 0' }]
                                                  },
                                                    { prim: 'FAILWITH' }],
                                                    []]
                                              },
                                              { prim: 'CAR' }]]
                                      },
                                      { prim: 'DUP' },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'PAIR' },
                                      { prim: 'DIG', args: [{ int: '4' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'EXEC' },
                                      { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                      { prim: 'DUP', args: [{ int: '3' }] },
                                      { prim: 'COMPARE' },
                                      { prim: 'EQ' },
                                      {
                                        prim: 'IF',
                                        args:
                                          [[{ prim: 'SWAP' },
                                            { prim: 'DROP' },
                                            { prim: 'DUP', args: [{ int: '3' }] },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'PAIR' },
                                            { prim: 'SENDER' },
                                            { prim: 'SELF_ADDRESS' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'DIG', args: [{ int: '3' }] },
                                            { prim: 'SWAP' },
                                            { prim: 'EXEC' }],
                                            [{ prim: 'DIG', args: [{ int: '4' }] },
                                              { prim: 'DROP' },
                                              {
                                                prim: 'NIL',
                                                args: [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                                              },
                                              { prim: 'DIG', args: [{ int: '2' }] },
                                              { prim: 'DUP', args: [{ int: '5' }] },
                                              { prim: 'CAR' },
                                              { prim: 'CAR' },
                                              { prim: 'CDR' },
                                              { prim: 'CAR' },
                                              { prim: 'CDR' },
                                              { prim: 'PAIR' },
                                              { prim: 'CONS' },
                                              { prim: 'SWAP' },
                                              { prim: 'SENDER' },
                                              { prim: 'PAIR' },
                                              { prim: 'CONS' },
                                              { prim: 'DUP', args: [{ int: '3' }] },
                                              { prim: 'CDR' },
                                              { prim: 'CDR' },
                                              { prim: 'CDR' },
                                              { prim: 'CDR' },
                                              { prim: 'SELF_ADDRESS' },
                                              { prim: 'SWAP' },
                                              { prim: 'UNPAIR' },
                                              { prim: 'DIG', args: [{ int: '2' }] },
                                              { prim: 'DIG', args: [{ int: '3' }] },
                                              {
                                                prim: 'MAP',
                                                args:
                                                  [[{ prim: 'UNPAIR' },
                                                    { prim: 'DUP', args: [{ int: '5' }] },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'SWAP' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'SWAP' },
                                                    { prim: 'PAIR' }]]
                                              },
                                              { prim: 'DIG', args: [{ int: '3' }] },
                                              { prim: 'DROP' },
                                              { prim: 'SWAP' },
                                              { prim: 'PAIR' },
                                              { prim: 'SWAP' },
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
                                                                          [{
                                                                            prim: 'nat',
                                                                            annots: ['%token_id']
                                                                          }, { prim: 'nat', annots: ['%amount'] }]
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
                                                  [[{ prim: 'DROP' },
                                                    { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'not_fa2' }] },
                                                    { prim: 'FAILWITH' }],
                                                    [{ prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
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
                                                                          {
                                                                            prim: 'pair',
                                                                            args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                          }]
                                                                    }]
                                                                }]
                                                          }]
                                                      },
                                                      { prim: 'DIG', args: [{ int: '3' }] },
                                                      { prim: 'CONS' },
                                                      { prim: 'TRANSFER_TOKENS' }]]
                                              }]]
                                      },
                                      { prim: 'DUP', args: [{ int: '3' }] },
                                      { prim: 'CDR' },
                                      { prim: 'DUP', args: [{ int: '4' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'CDR' },
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'PAIR' },
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'PAIR' },
                                      { prim: 'PAIR' },
                                      { prim: 'NIL', args: [{ prim: 'operation' }] },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'CONS' },
                                      { prim: 'PAIR' }]]
                              }]]
                      }]]
                }]]
          }],
      storage:
        [{
          prim: 'Pair',
          args:
            [[{
              prim: 'Pair',
              args: [{ bytes: '0000e466ff944f5a66a06c787f02034add4afb8ac0cf' }, { prim: 'None' }]
            },
              {
                prim: 'Pair',
                args: [{ int: '20160' }, { bytes: '0000b28066369a8ed09ba9d3d47f19598440266013f0' }]
              },
              { int: '25' },
              [{ prim: 'Elt', args: [{ int: '1' }, { int: '4' }] },
                { prim: 'Elt', args: [{ int: '2' }, { int: '8' }] },
                { prim: 'Elt', args: [{ int: '3' }, { int: '8' }] },
                { prim: 'Elt', args: [{ int: '4' }, { int: '8' }] },
                { prim: 'Elt', args: [{ int: '5' }, { int: '16' }] },
                { prim: 'Elt', args: [{ int: '6' }, { int: '16' }] },
                { prim: 'Elt', args: [{ int: '7' }, { int: '16' }] },
                { prim: 'Elt', args: [{ int: '8' }, { int: '16' }] },
                { prim: 'Elt', args: [{ int: '9' }, { int: '16' }] },
                { prim: 'Elt', args: [{ int: '10' }, { int: '16' }] },
                { prim: 'Elt', args: [{ int: '11' }, { int: '16' }] },
                { prim: 'Elt', args: [{ int: '12' }, { int: '16' }] }]],
              {
                prim: 'Pair',
                args:
                  [{ prim: 'Pair', args: [{ int: '17664' }, { int: '428884923955008' }] },
                    { int: '17665' }]
              }]
        },
          {
            prim: 'Pair',
            args:
              [{
                prim: 'Pair',
                args:
                  [{ prim: 'Pair', args: [{ int: '717698599724750' }, { int: '8' }] },
                    { prim: 'Pair', args: [{ int: '1774138' }, { int: '1890547' }] }]
              },
                { prim: 'Pair', args: [{ int: '4195143849206349206349206' }, { int: '56320' }] }]
          },
          {
            prim: 'Pair',
            args: [{ int: '161280' }, { bytes: '00009912823c28ac86f5724b0907db078757255c4d1d' }]
          },
          {
            prim: 'Pair',
            args: [{ bytes: '0181e59d439a9d27a80396e2f360d9de8cbc4a1ef300' }, { int: '0' }]
          },
          { bytes: '0181e59d439a9d27a80396e2f360d9de8cbc4a1ef300' },
          { int: '0' }]
    },
  entrypoints:
    {
      entrypoints:
        {
          withdraw:
            {
              prim: 'pair',
              args:
                [{ prim: 'nat', annots: ['%stake_index'] },
                  { prim: 'nat', annots: ['%amount'] }]
            },
          wallet:
            {
              prim: 'or',
              args:
                [{
                  prim: 'or',
                  args:
                    [{ prim: 'unit', annots: ['%claim'] }, { prim: 'nat', annots: ['%stake'] }]
                },
                  {
                    prim: 'pair',
                    args:
                      [{ prim: 'nat', annots: ['%stake_index'] },
                        { prim: 'nat', annots: ['%amount'] }],
                    annots: ['%withdraw']
                  }]
            },
          update_plan: { prim: 'nat' },
          stake: { prim: 'nat' },
          set_fees_per_cycles: { prim: 'map', args: [{ prim: 'nat' }, { prim: 'nat' }] },
          set_default_fees: { prim: 'nat' },
          set_blocks_per_cycle: { prim: 'nat' },
          plan:
            {
              prim: 'or',
              args:
                [{ prim: 'nat', annots: ['%change_duration'] },
                  { prim: 'nat', annots: ['%update_plan'] }]
            },
          fees:
            {
              prim: 'or',
              args:
                [{
                  prim: 'or',
                  args:
                    [{ prim: 'nat', annots: ['%set_blocks_per_cycle'] },
                      { prim: 'nat', annots: ['%set_default_fees'] }]
                },
                  {
                    prim: 'map',
                    args: [{ prim: 'nat' }, { prim: 'nat' }],
                    annots: ['%set_fees_per_cycles']
                  }]
            },
          confirm_new_admin: { prim: 'unit' },
          claim: { prim: 'unit' },
          change_duration: { prim: 'nat' },
          change_admin: { prim: 'address' },
          admin:
            {
              prim: 'or',
              args:
                [{ prim: 'address', annots: ['%change_admin'] },
                  { prim: 'unit', annots: ['%confirm_new_admin'] }]
            }
        }
    }
};