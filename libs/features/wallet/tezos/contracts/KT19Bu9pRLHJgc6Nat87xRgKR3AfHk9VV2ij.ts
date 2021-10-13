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
                          [{ prim: 'nat', annots: ['%change_duration'] },
                            { prim: 'nat', annots: ['%update_plan'] }],
                        annots: ['%plan']
                      }]
                },
                  {
                    prim: 'or',
                    args:
                      [{
                        prim: 'or',
                        args:
                          [{ prim: 'unit', annots: ['%claim'] }, { prim: 'nat', annots: ['%stake'] }]
                      },
                        { prim: 'nat', annots: ['%withdraw'] }],
                    annots: ['%wallet']
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
                              prim: 'big_map',
                              args:
                                [{ prim: 'address' },
                                  {
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'nat', annots: ['%reward_per_token_paid'] },
                                        { prim: 'nat', annots: ['%unpaid'] }]
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
                                  prim: 'big_map',
                                  args: [{ prim: 'address' }, { prim: 'nat' }],
                                  annots: ['%balances']
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
                                  args: [{ prim: 'address' }, { prim: 'nat' }],
                                  annots: ['%staked_token']
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
                                      [{ prim: 'big_map', args: [{ prim: 'address' }, { prim: 'nat' }] },
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
                                      { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
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
                                        [{ prim: 'big_map', args: [{ prim: 'address' }, { prim: 'nat' }] },
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
                                        { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
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
                          { prim: 'big_map', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                    },
                      { prim: 'nat' },
                      [{ prim: 'UNPAIR' },
                        { prim: 'GET' },
                        {
                          prim: 'IF_NONE',
                          args: [[{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] }], []]
                        }]]
                },
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
                                { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                          }]
                    },
                      { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                      [{ prim: 'UNPAIR' },
                        { prim: 'GET' },
                        {
                          prim: 'IF_NONE',
                          args:
                            [[{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                              { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
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
                                  [{ prim: 'nat' }, { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
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
                        { prim: 'UNPAIR' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CAR' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'SWAP' },
                        { prim: 'EXEC' },
                        { prim: 'SWAP' },
                        { prim: 'MUL' },
                        { prim: 'SWAP' },
                        { prim: 'CDR' },
                        { prim: 'ADD' }]]
                },
                { prim: 'SWAP' },
                { prim: 'APPLY' },
                { prim: 'DUP', args: [{ int: '5' }] },
                { prim: 'DUP', args: [{ int: '4' }] },
                { prim: 'DUP', args: [{ int: '4' }] },
                { prim: 'DUP', args: [{ int: '4' }] },
                { prim: 'PAIR', args: [{ int: '4' }] },
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
                                        [{ prim: 'nat' }, { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
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
                                                  { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                            }]
                                      },
                                        { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
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
                                                  { prim: 'big_map', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                                            },
                                              { prim: 'nat' }]
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
                                                                  prim: 'big_map',
                                                                  args: [{ prim: 'address' }, { prim: 'nat' }]
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
                                                                [{
                                                                  prim: 'pair',
                                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                },
                                                                  {
                                                                    prim: 'pair',
                                                                    args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                  }]
                                                            },
                                                              {
                                                                prim: 'pair',
                                                                args: [{ prim: 'nat' }, { prim: 'nat' }]
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
                                                                  args: [{ prim: 'address' }, { prim: 'nat' }]
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
                                                                    prim: 'big_map',
                                                                    args: [{ prim: 'address' }, { prim: 'nat' }]
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
                                                                  [{
                                                                    prim: 'pair',
                                                                    args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                  },
                                                                    {
                                                                      prim: 'pair',
                                                                      args: [{ prim: 'nat' }, { prim: 'nat' }]
                                                                    }]
                                                              },
                                                                {
                                                                  prim: 'pair',
                                                                  args: [{ prim: 'nat' }, { prim: 'nat' }]
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
                                            [{ prim: 'big_map', args: [{ prim: 'address' }, { prim: 'nat' }] },
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
                                            { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                                      }]
                                }]
                          }]
                    },
                      {
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
                                          args: [{ prim: 'address' }, { prim: 'option', args: [{ prim: 'address' }] }]
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
                                              [{ prim: 'big_map', args: [{ prim: 'address' }, { prim: 'nat' }] },
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
                                              { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                                        }]
                                  }]
                            }]
                      },
                      [{ prim: 'UNPAIR' },
                        { prim: 'UNPAIR', args: [{ int: '4' }] },
                        { prim: 'DIG', args: [{ int: '4' }] },
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
                        { prim: 'DIG', args: [{ int: '4' }] },
                        { prim: 'SWAP' },
                        { prim: 'EXEC' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'SENDER' },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '5' }] },
                        { prim: 'SWAP' },
                        { prim: 'EXEC' },
                        { prim: 'DUP', args: [{ int: '3' }] },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'SWAP' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'SWAP' },
                        { prim: 'EXEC' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'SWAP' },
                        { prim: 'DUP', args: [{ int: '3' }] },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'SOME' },
                        { prim: 'SENDER' },
                        { prim: 'UPDATE' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CDR' },
                        { prim: 'DUP', args: [{ int: '3' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' },
                        { prim: 'SWAP' },
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
                                      [{ prim: 'big_map', args: [{ prim: 'address' }, { prim: 'nat' }] },
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
                                      { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
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
                                        [{ prim: 'big_map', args: [{ prim: 'address' }, { prim: 'nat' }] },
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
                                        { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
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
                      { prim: 'DROP' },
                      { prim: 'DIG', args: [{ int: '3' }] },
                      { prim: 'DROP' },
                      { prim: 'DIG', args: [{ int: '3' }] },
                      { prim: 'DROP' },
                      { prim: 'DIG', args: [{ int: '3' }] },
                      { prim: 'DROP' },
                      { prim: 'DIG', args: [{ int: '7' }] },
                      { prim: 'DROP' },
                      { prim: 'DIG', args: [{ int: '8' }] },
                      { prim: 'DROP' },
                      {
                        prim: 'IF_LEFT',
                        args:
                          [[{ prim: 'DIG', args: [{ int: '3' }] },
                            { prim: 'DROP' },
                            { prim: 'DIG', args: [{ int: '3' }] },
                            { prim: 'DROP' },
                            { prim: 'DIG', args: [{ int: '3' }] },
                            { prim: 'DROP' },
                            { prim: 'DIG', args: [{ int: '3' }] },
                            { prim: 'DROP' },
                            { prim: 'DIG', args: [{ int: '3' }] },
                            { prim: 'DROP' },
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
                                  [{ prim: 'DROP' },
                                    { prim: 'SWAP' },
                                    { prim: 'DROP' },
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
                                  [[{ prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'DROP' },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'DROP' },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'DROP' },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'DROP' },
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
                                    [{ prim: 'DIG', args: [{ int: '6' }] },
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
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'CDR' },
                                      { prim: 'LEVEL' },
                                      { prim: 'COMPARE' },
                                      { prim: 'LT' },
                                      {
                                        prim: 'IF',
                                        args:
                                          [[{ prim: 'DROP', args: [{ int: '4' }] },
                                            {
                                              prim: 'PUSH',
                                              args: [{ prim: 'string' }, { string: 'DISTRIBUTION_RUNNING' }]
                                            },
                                            { prim: 'FAILWITH' }],
                                            [{ prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'CDR' },
                                              { prim: 'CAR' },
                                              { prim: 'CDR' },
                                              { prim: 'CDR' },
                                              { prim: 'DIG', args: [{ int: '5' }] },
                                              { prim: 'DUP', args: [{ int: '4' }] },
                                              { prim: 'CDR' },
                                              { prim: 'CAR' },
                                              { prim: 'CAR' },
                                              { prim: 'CAR' },
                                              { prim: 'CDR' },
                                              { prim: 'DIG', args: [{ int: '3' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'DIG', args: [{ int: '2' }] },
                                              { prim: 'SUB' },
                                              { prim: 'ABS' },
                                              { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '10' }] },
                                              { prim: 'PAIR' },
                                              { prim: 'DIG', args: [{ int: '6' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'EXEC' },
                                              { prim: 'SWAP' },
                                              { prim: 'MUL' },
                                              { prim: 'ADD' },
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
                                                  [[{
                                                    prim: 'PUSH',
                                                    args: [{ prim: 'string' }, { string: 'Bad amount' }]
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
                                                  [[{ prim: 'DROP', args: [{ int: '3' }] },
                                                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                    { prim: 'PAIR' }],
                                                    [{ prim: 'DUP', args: [{ int: '4' }] },
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
                                                      { prim: 'DUP', args: [{ int: '7' }] },
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
                                                      { prim: 'DUP', args: [{ int: '3' }] },
                                                      { prim: 'CDR' },
                                                      { prim: 'CDR' },
                                                      { prim: 'SWAP' },
                                                      { prim: 'PAIR' },
                                                      { prim: 'DUP', args: [{ int: '3' }] },
                                                      { prim: 'CAR' },
                                                      { prim: 'PAIR' },
                                                      { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                      { prim: 'DIG', args: [{ int: '3' }] },
                                                      { prim: 'DIG', args: [{ int: '3' }] },
                                                      { prim: 'SWAP' },
                                                      { prim: 'CDR' },
                                                      { prim: 'CDR' },
                                                      { prim: 'CAR' },
                                                      { prim: 'CDR' },
                                                      {
                                                        prim: 'CONTRACT',
                                                        args: [{ prim: 'nat' }],
                                                        annots: ['%claim_fees']
                                                      },
                                                      {
                                                        prim: 'IF_NONE',
                                                        args:
                                                          [[{
                                                            prim: 'PUSH',
                                                            args: [{ prim: 'string' }, { string: 'not_reserve_contract' }]
                                                          },
                                                            { prim: 'FAILWITH' }],
                                                            []]
                                                      },
                                                      { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                                                      { prim: 'DIG', args: [{ int: '2' }] },
                                                      { prim: 'TRANSFER_TOKENS' },
                                                      { prim: 'CONS' },
                                                      { prim: 'PAIR' }]]
                                              }]]
                                      }]]
                              }]]
                      }],
                      [{ prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'DROP' },
                        {
                          prim: 'IF_LEFT',
                          args:
                            [[{ prim: 'DIG', args: [{ int: '10' }] },
                              { prim: 'DROP' },
                              {
                                prim: 'IF_LEFT',
                                args:
                                  [[{ prim: 'DROP' },
                                    { prim: 'SWAP' },
                                    { prim: 'DROP' },
                                    { prim: 'DIG', args: [{ int: '7' }] },
                                    { prim: 'DROP' },
                                    { prim: 'DIG', args: [{ int: '7' }] },
                                    { prim: 'DROP' },
                                    { prim: 'DIG', args: [{ int: '7' }] },
                                    { prim: 'DROP' },
                                    { prim: 'DIG', args: [{ int: '5' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'EXEC' },
                                    { prim: 'DUP' },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'SENDER' },
                                    { prim: 'PAIR' },
                                    { prim: 'DIG', args: [{ int: '4' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'EXEC' },
                                    { prim: 'SWAP' },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '2' }] },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'SENDER' },
                                    { prim: 'PAIR' },
                                    { prim: 'DIG', args: [{ int: '4' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'EXEC' },
                                    { prim: 'DUP', args: [{ int: '3' }] },
                                    { prim: 'CDR' },
                                    { prim: 'CAR' },
                                    { prim: 'SWAP' },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'PAIR' },
                                    { prim: 'PAIR' },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'EXEC' },
                                    { prim: 'SWAP' },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '2' }] },
                                    { prim: 'CDR' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'SUB' },
                                    { prim: 'ABS' },
                                    { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '10' }] },
                                    { prim: 'PAIR' },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'EXEC' },
                                    { prim: 'SWAP' },
                                    { prim: 'EDIV' },
                                    {
                                      prim: 'IF_NONE',
                                      args:
                                        [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'bad_exponent' }] },
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
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'DUP', args: [{ int: '4' }] },
                                            { prim: 'CDR' },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'SOME' },
                                            { prim: 'SENDER' },
                                            { prim: 'UPDATE' },
                                            { prim: 'SWAP' },
                                            { prim: 'SENDER' },
                                            { prim: 'DUP', args: [{ int: '4' }] },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            {
                                              prim: 'CONTRACT',
                                              args:
                                                [{
                                                  prim: 'pair',
                                                  args:
                                                    [{ prim: 'address', annots: ['%to_'] }, {
                                                      prim: 'nat',
                                                      annots: ['%amount']
                                                    }]
                                                }],
                                              annots: ['%transfer_to_delegator']
                                            },
                                            {
                                              prim: 'IF_NONE',
                                              args:
                                                [[{ prim: 'DROP', args: [{ int: '2' }] },
                                                  {
                                                    prim: 'PUSH',
                                                    args: [{ prim: 'string' }, { string: 'not_reserve_contract' }]
                                                  },
                                                  { prim: 'FAILWITH' }],
                                                  [{ prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'DIG', args: [{ int: '3' }] },
                                                    { prim: 'SWAP' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'TRANSFER_TOKENS' }]]
                                            },
                                            { prim: 'DUP', args: [{ int: '3' }] },
                                            { prim: 'CDR' },
                                            { prim: 'DUP', args: [{ int: '4' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'DIG', args: [{ int: '3' }] },
                                            { prim: 'DIG', args: [{ int: '4' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'NIL', args: [{ prim: 'operation' }] },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'CONS' },
                                            { prim: 'PAIR' }]]
                                    }],
                                    [{ prim: 'DIG', args: [{ int: '3' }] },
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
                                      { prim: 'DUP', args: [{ int: '3' }] },
                                      { prim: 'CAR' },
                                      { prim: 'DUP', args: [{ int: '3' }] },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'ADD' },
                                      { prim: 'SOME' },
                                      { prim: 'SENDER' },
                                      { prim: 'UPDATE' },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP', args: [{ int: '3' }] },
                                      { prim: 'CDR' },
                                      { prim: 'ADD' },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'CAR' },
                                      { prim: 'PAIR' },
                                      { prim: 'CDR' },
                                      { prim: 'SWAP' },
                                      { prim: 'PAIR' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '3' }] },
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
                                { prim: 'DIG', args: [{ int: '5' }] },
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
                                { prim: 'DUP', args: [{ int: '3' }] },
                                { prim: 'CAR' },
                                { prim: 'DUP', args: [{ int: '3' }] },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'PAIR' },
                                { prim: 'DUP', args: [{ int: '7' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'SOME' },
                                { prim: 'SENDER' },
                                { prim: 'UPDATE' },
                                { prim: 'SWAP' },
                                { prim: 'DUP', args: [{ int: '3' }] },
                                { prim: 'CDR' },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '5' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'PAIR' },
                                { prim: 'CDR' },
                                { prim: 'SWAP' },
                                { prim: 'PAIR' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '3' }] },
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
                        }]]
                }]]
          }],
      storage:
        [{
          prim: 'Pair',
          args:
            [{
              prim: 'Pair',
              args:
                [{
                  prim: 'Pair',
                  args: [{ bytes: '00016a583ec5ade638adb016adea22b63976e7630ee3' }, { prim: 'None' }]
                },
                  { int: '15226' }]
            },
              {
                prim: 'Pair',
                args:
                  [{ prim: 'Pair', args: [{ int: '15227' }, { int: '9938820716563' }] },
                    { int: '15228' }]
              }]
        },
          {
            prim: 'Pair',
            args:
              [{
                prim: 'Pair',
                args:
                  [{ prim: 'Pair', args: [{ int: '225393921072482' }, { int: '18' }] },
                    { prim: 'Pair', args: [{ int: '1773735' }, { int: '1775780' }] }]
              },
                { prim: 'Pair', args: [{ int: '926612893909424156' }, { int: '16000' }] }]
          },
          {
            prim: 'Pair',
            args: [{ int: '20160' }, { bytes: '01b5c16c9d3059d998765c94018c8831dd32b3cd3900' }]
          },
          { bytes: '0181e59d439a9d27a80396e2f360d9de8cbc4a1ef300' },
          { int: '0' }]
    },
  entrypoints:
    {
      entrypoints:
        {
          withdraw: { prim: 'nat' },
          wallet:
            {
              prim: 'or',
              args:
                [{
                  prim: 'or',
                  args:
                    [{ prim: 'unit', annots: ['%claim'] }, { prim: 'nat', annots: ['%stake'] }]
                },
                  { prim: 'nat', annots: ['%withdraw'] }]
            },
          update_plan: { prim: 'nat' },
          stake: { prim: 'nat' },
          plan:
            {
              prim: 'or',
              args:
                [{ prim: 'nat', annots: ['%change_duration'] },
                  { prim: 'nat', annots: ['%update_plan'] }]
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