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
                        [{
                          prim: 'or',
                          args:
                            [{ prim: 'unit', annots: ['%confirm_admin'] },
                              {
                                prim: 'list',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'nat', annots: ['%token_id'] },
                                        { prim: 'bool', annots: ['%paused'] }]
                                  }],
                                annots: ['%pause']
                              }]
                        },
                          {
                            prim: 'or',
                            args:
                              [{ prim: 'address', annots: ['%set_admin'] },
                                { prim: 'address', annots: ['%set_minter'] }]
                          }],
                      annots: ['%admin']
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
                                  [{
                                    prim: 'list',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'address', annots: ['%owner'] },
                                            { prim: 'nat', annots: ['%token_id'] }]
                                      }],
                                    annots: ['%requests']
                                  },
                                    {
                                      prim: 'contract',
                                      args:
                                        [{
                                          prim: 'list',
                                          args:
                                            [{
                                              prim: 'pair',
                                              args:
                                                [{
                                                  prim: 'pair',
                                                  args:
                                                    [{ prim: 'address', annots: ['%owner'] },
                                                      { prim: 'nat', annots: ['%token_id'] }],
                                                  annots: ['%request']
                                                },
                                                  { prim: 'nat', annots: ['%balance'] }]
                                            }]
                                        }],
                                      annots: ['%callback']
                                    }],
                                annots: ['%balance_of']
                              },
                                {
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
                                    }],
                                  annots: ['%transfer']
                                }]
                          },
                            {
                              prim: 'list',
                              args:
                                [{
                                  prim: 'or',
                                  args:
                                    [{
                                      prim: 'pair',
                                      args:
                                        [{ prim: 'address', annots: ['%owner'] },
                                          {
                                            prim: 'pair',
                                            args:
                                              [{ prim: 'address', annots: ['%operator'] },
                                                { prim: 'nat', annots: ['%token_id'] }]
                                          }],
                                      annots: ['%add_operator']
                                    },
                                      {
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'address', annots: ['%owner'] },
                                            {
                                              prim: 'pair',
                                              args:
                                                [{ prim: 'address', annots: ['%operator'] },
                                                  { prim: 'nat', annots: ['%token_id'] }]
                                            }],
                                        annots: ['%remove_operator']
                                      }]
                                }],
                              annots: ['%update_operators']
                            }],
                        annots: ['%assets']
                      }]
                },
                  {
                    prim: 'or',
                    args:
                      [{
                        prim: 'or',
                        args:
                          [{
                            prim: 'or',
                            args:
                              [{ prim: 'unit', annots: ['%confirm_oracle_migration'] },
                                {
                                  prim: 'list',
                                  args:
                                    [{
                                      prim: 'pair',
                                      args:
                                        [{ prim: 'address', annots: ['%to_'] }, { prim: 'nat', annots: ['%amount'] }]
                                    }],
                                  annots: ['%distribute']
                                }]
                          },
                            { prim: 'address', annots: ['%migrate_oracle'] }],
                        annots: ['%oracle']
                      },
                        {
                          prim: 'or',
                          args:
                            [{
                              prim: 'list',
                              args:
                                [{
                                  prim: 'pair',
                                  args:
                                    [{ prim: 'address', annots: ['%owner'] },
                                      {
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'nat', annots: ['%token_id'] }, { prim: 'nat', annots: ['%amount'] }]
                                      }]
                                }],
                              annots: ['%burn_tokens']
                            },
                              {
                                prim: 'list',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'address', annots: ['%owner'] },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'nat', annots: ['%token_id'] }, {
                                              prim: 'nat',
                                              annots: ['%amount']
                                            }]
                                        }]
                                  }],
                                annots: ['%mint_tokens']
                              }],
                          annots: ['%tokens']
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
                              [{ prim: 'address', annots: ['%admin'] },
                                { prim: 'address', annots: ['%minter'] }]
                          },
                            {
                              prim: 'pair',
                              args:
                                [{ prim: 'bool', annots: ['%paused'] },
                                  { prim: 'option', args: [{ prim: 'address' }], annots: ['%pending_admin'] }]
                            }],
                        annots: ['%admin']
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
                                  annots: ['%ledger']
                                },
                                  {
                                    prim: 'big_map',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'address', annots: ['%owner'] },
                                            { prim: 'address', annots: ['%operator'] }]
                                      },
                                        { prim: 'unit' }],
                                    annots: ['%operators']
                                  }]
                            },
                              {
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'big_map',
                                    args:
                                      [{ prim: 'nat' },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'nat', annots: ['%token_id'] },
                                              {
                                                prim: 'map',
                                                args: [{ prim: 'string' }, { prim: 'bytes' }],
                                                annots: ['%token_info']
                                              }]
                                        }],
                                    annots: ['%token_metadata']
                                  },
                                    { prim: 'nat', annots: ['%total_supply'] }]
                              }],
                          annots: ['%assets']
                        }]
                  },
                    {
                      prim: 'pair',
                      args:
                        [{
                          prim: 'big_map',
                          args: [{ prim: 'string' }, { prim: 'bytes' }],
                          annots: ['%metadata']
                        },
                          {
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{ prim: 'nat', annots: ['%distributed'] },
                                    { prim: 'nat', annots: ['%max_supply'] }]
                              },
                                {
                                  prim: 'pair',
                                  args:
                                    [{ prim: 'address', annots: ['%contract'] },
                                      { prim: 'option', args: [{ prim: 'address' }], annots: ['%pending_contract'] }],
                                  annots: ['%role']
                                }],
                            annots: ['%oracle']
                          }]
                    }]
              }]
          },
          {
            prim: 'code',
            args:
              [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'FA2_TOKEN_UNDEFINED' }] },
                {
                  prim: 'LAMBDA',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                          {
                            prim: 'pair',
                            args: [{ prim: 'bool' }, { prim: 'option', args: [{ prim: 'address' }] }]
                          }]
                    },
                      {
                        prim: 'pair',
                        args:
                          [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                            {
                              prim: 'pair',
                              args: [{ prim: 'bool' }, { prim: 'option', args: [{ prim: 'address' }] }]
                            }]
                      },
                      [{ prim: 'DUP' },
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
                { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
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
                                [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                  {
                                    prim: 'pair',
                                    args: [{ prim: 'bool' }, { prim: 'option', args: [{ prim: 'address' }] }]
                                  }]
                            },
                              {
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'big_map', args: [{ prim: 'address' }, { prim: 'nat' }] },
                                        {
                                          prim: 'big_map',
                                          args:
                                            [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                              { prim: 'unit' }]
                                        }]
                                  },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{
                                          prim: 'big_map',
                                          args:
                                            [{ prim: 'nat' },
                                              {
                                                prim: 'pair',
                                                args:
                                                  [{ prim: 'nat' },
                                                    { prim: 'map', args: [{ prim: 'string' }, { prim: 'bytes' }] }]
                                              }]
                                        },
                                          { prim: 'nat' }]
                                    }]
                              }]
                        },
                          {
                            prim: 'pair',
                            args:
                              [{ prim: 'big_map', args: [{ prim: 'string' }, { prim: 'bytes' }] },
                                {
                                  prim: 'pair',
                                  args:
                                    [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                      {
                                        prim: 'pair',
                                        args: [{ prim: 'address' }, { prim: 'option', args: [{ prim: 'address' }] }]
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
                                  [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                    {
                                      prim: 'pair',
                                      args: [{ prim: 'bool' }, { prim: 'option', args: [{ prim: 'address' }] }]
                                    }]
                              },
                                {
                                  prim: 'pair',
                                  args:
                                    [{
                                      prim: 'pair',
                                      args:
                                        [{ prim: 'big_map', args: [{ prim: 'address' }, { prim: 'nat' }] },
                                          {
                                            prim: 'big_map',
                                            args:
                                              [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                                { prim: 'unit' }]
                                          }]
                                    },
                                      {
                                        prim: 'pair',
                                        args:
                                          [{
                                            prim: 'big_map',
                                            args:
                                              [{ prim: 'nat' },
                                                {
                                                  prim: 'pair',
                                                  args:
                                                    [{ prim: 'nat' },
                                                      { prim: 'map', args: [{ prim: 'string' }, { prim: 'bytes' }] }]
                                                }]
                                          },
                                            { prim: 'nat' }]
                                      }]
                                }]
                          },
                            {
                              prim: 'pair',
                              args:
                                [{ prim: 'big_map', args: [{ prim: 'string' }, { prim: 'bytes' }] },
                                  {
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] },
                                        {
                                          prim: 'pair',
                                          args: [{ prim: 'address' }, { prim: 'option', args: [{ prim: 'address' }] }]
                                        }]
                                  }]
                            }]
                      },
                      [{ prim: 'DUP' },
                        { prim: 'CDR' },
                        { prim: 'CDR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'SENDER' },
                        { prim: 'COMPARE' },
                        { prim: 'EQ' },
                        {
                          prim: 'IF',
                          args:
                            [[],
                              [{ prim: 'DROP' },
                                { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'UNAUTHORIZED' }] },
                                { prim: 'FAILWITH' }]]
                        }]]
                },
                { prim: 'DIG', args: [{ int: '4' }] },
                { prim: 'UNPAIR' },
                { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                { prim: 'AMOUNT' },
                { prim: 'COMPARE' },
                { prim: 'GT' },
                {
                  prim: 'IF',
                  args:
                    [[{ prim: 'DROP', args: [{ int: '6' }] },
                      { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'FORBIDDEN_XTZ' }] },
                      { prim: 'FAILWITH' }],
                      [{
                        prim: 'IF_LEFT',
                        args:
                          [[{ prim: 'DIG', args: [{ int: '2' }] },
                            { prim: 'DROP' },
                            {
                              prim: 'IF_LEFT',
                              args:
                                [[{ prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'DROP' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'DROP' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'SWAP' },
                                  {
                                    prim: 'IF_LEFT',
                                    args:
                                      [[{
                                        prim: 'IF_LEFT',
                                        args:
                                          [[{ prim: 'DROP' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'DROP' },
                                            { prim: 'DUP' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            {
                                              prim: 'IF_NONE',
                                              args:
                                                [[{ prim: 'DROP' },
                                                  {
                                                    prim: 'PUSH',
                                                    args: [{ prim: 'string' }, { string: 'NO_PENDING_ADMIN' }]
                                                  },
                                                  { prim: 'FAILWITH' }],
                                                  [{ prim: 'SENDER' },
                                                    { prim: 'COMPARE' },
                                                    { prim: 'EQ' },
                                                    {
                                                      prim: 'IF',
                                                      args:
                                                        [[{ prim: 'NONE', args: [{ prim: 'address' }] },
                                                          { prim: 'SWAP' },
                                                          { prim: 'DUP' },
                                                          { prim: 'DUG', args: [{ int: '2' }] },
                                                          { prim: 'CDR' },
                                                          { prim: 'CAR' },
                                                          { prim: 'PAIR' },
                                                          { prim: 'SWAP' },
                                                          { prim: 'CAR' },
                                                          { prim: 'CDR' },
                                                          { prim: 'SENDER' },
                                                          { prim: 'PAIR' },
                                                          { prim: 'PAIR' }],
                                                          [{ prim: 'DROP' },
                                                            {
                                                              prim: 'PUSH',
                                                              args: [{ prim: 'string' }, { string: 'NOT_A_PENDING_ADMIN' }]
                                                            },
                                                            { prim: 'FAILWITH' }]]
                                                    }]]
                                            },
                                            { prim: 'NIL', args: [{ prim: 'operation' }] },
                                            { prim: 'PAIR' }],
                                            [{ prim: 'SWAP' },
                                              { prim: 'DIG', args: [{ int: '3' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'EXEC' },
                                              { prim: 'SWAP' },
                                              { prim: 'PUSH', args: [{ prim: 'bool' }, { prim: 'True' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'ITER', args: [[{ prim: 'CDR' }, { prim: 'AND' }]] },
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
                                      }],
                                        [{
                                          prim: 'IF_LEFT',
                                          args:
                                            [[{ prim: 'SWAP' },
                                              { prim: 'DIG', args: [{ int: '3' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'EXEC' },
                                              { prim: 'SWAP' },
                                              { prim: 'SOME' },
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
                                              [{ prim: 'SWAP' },
                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'SWAP' },
                                                { prim: 'EXEC' },
                                                { prim: 'DUP' },
                                                { prim: 'CDR' },
                                                { prim: 'DUG', args: [{ int: '2' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
                                                { prim: 'PAIR' },
                                                { prim: 'PAIR' },
                                                { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                { prim: 'PAIR' }]]
                                        }]]
                                  },
                                  { prim: 'UNPAIR' },
                                  { prim: 'DUP', args: [{ int: '3' }] },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'SWAP' },
                                  { prim: 'PAIR' }],
                                  [{ prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'DROP' },
                                    { prim: 'SWAP' },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '2' }] },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'CAR' },
                                    {
                                      prim: 'IF',
                                      args:
                                        [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'PAUSED' }] },
                                          { prim: 'FAILWITH' }],
                                          []]
                                    },
                                    {
                                      prim: 'IF_LEFT',
                                      args:
                                        [[{
                                          prim: 'IF_LEFT',
                                          args:
                                            [[{ prim: 'DUP' },
                                              { prim: 'CAR' },
                                              {
                                                prim: 'MAP',
                                                args:
                                                  [[{ prim: 'DUP', args: [{ int: '3' }] },
                                                    { prim: 'CAR' },
                                                    { prim: 'CDR' },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DROP' },
                                                    { prim: 'DUP', args: [{ int: '5' }] },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'COMPARE' },
                                                    { prim: 'EQ' },
                                                    {
                                                      prim: 'IF',
                                                      args:
                                                        [[{ prim: 'DROP' }],
                                                          [{ prim: 'DROP' },
                                                            {
                                                              prim: 'PUSH',
                                                              args: [{ prim: 'unit' }, { prim: 'Unit' }]
                                                            },
                                                            { prim: 'DUP', args: [{ int: '6' }] },
                                                            { prim: 'PAIR' },
                                                            { prim: 'FAILWITH' }]]
                                                    },
                                                    { prim: 'DUP', args: [{ int: '3' }] },
                                                    { prim: 'CAR' },
                                                    { prim: 'CDR' },
                                                    { prim: 'CAR' },
                                                    { prim: 'CAR' },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'CAR' },
                                                    { prim: 'GET' },
                                                    {
                                                      prim: 'IF_NONE',
                                                      args: [[{
                                                        prim: 'PUSH',
                                                        args: [{ prim: 'nat' }, { int: '0' }]
                                                      }], []]
                                                    },
                                                    { prim: 'SWAP' },
                                                    { prim: 'PAIR' }]]
                                              },
                                              { prim: 'DIG', args: [{ int: '3' }] },
                                              { prim: 'DROP' },
                                              { prim: 'DIG', args: [{ int: '3' }] },
                                              { prim: 'DROP' },
                                              { prim: 'SWAP' },
                                              { prim: 'CDR' },
                                              { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                                              { prim: 'DIG', args: [{ int: '2' }] },
                                              { prim: 'TRANSFER_TOKENS' },
                                              { prim: 'SWAP' },
                                              { prim: 'NIL', args: [{ prim: 'operation' }] },
                                              { prim: 'DIG', args: [{ int: '2' }] },
                                              { prim: 'CONS' },
                                              { prim: 'PAIR' }],
                                              [{
                                                prim: 'ITER',
                                                args:
                                                  [[{ prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'CDR' },
                                                    {
                                                      prim: 'ITER',
                                                      args:
                                                        [[{ prim: 'SWAP' },
                                                          { prim: 'DUP' },
                                                          { prim: 'DUP', args: [{ int: '4' }] },
                                                          { prim: 'CAR' },
                                                          { prim: 'DUP' },
                                                          { prim: 'SENDER' },
                                                          { prim: 'COMPARE' },
                                                          { prim: 'EQ' },
                                                          {
                                                            prim: 'IF',
                                                            args:
                                                              [[{ prim: 'SWAP' }, { prim: 'DROP' }],
                                                                [{ prim: 'SENDER' },
                                                                  { prim: 'SWAP' },
                                                                  { prim: 'DUP' },
                                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                                  { prim: 'PAIR' },
                                                                  { prim: 'DIG', args: [{ int: '2' }] },
                                                                  { prim: 'CAR' },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'CAR' },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'SWAP' },
                                                                  { prim: 'MEM' },
                                                                  {
                                                                    prim: 'IF',
                                                                    args:
                                                                      [[],
                                                                        [{ prim: 'DROP' },
                                                                          {
                                                                            prim: 'PUSH',
                                                                            args: [{ prim: 'unit' }, { prim: 'Unit' }]
                                                                          },
                                                                          {
                                                                            prim: 'PUSH',
                                                                            args: [{ prim: 'string' }, { string: 'FA2_NOT_OPERATOR' }]
                                                                          },
                                                                          { prim: 'PAIR' },
                                                                          { prim: 'FAILWITH' }]]
                                                                  }]]
                                                          },
                                                          { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                                          { prim: 'DUP', args: [{ int: '4' }] },
                                                          { prim: 'CDR' },
                                                          { prim: 'CDR' },
                                                          { prim: 'COMPARE' },
                                                          { prim: 'EQ' },
                                                          {
                                                            prim: 'IF',
                                                            args:
                                                              [[{ prim: 'DROP' }, { prim: 'SWAP' }, { prim: 'DROP' }],
                                                                [{ prim: 'DUP', args: [{ int: '5' }] },
                                                                  { prim: 'DUP', args: [{ int: '4' }] },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'CAR' },
                                                                  { prim: 'COMPARE' },
                                                                  { prim: 'EQ' },
                                                                  {
                                                                    prim: 'IF',
                                                                    args:
                                                                      [[{
                                                                        prim: 'DUP',
                                                                        args: [{ int: '3' }]
                                                                      }, { prim: 'CDR' }, { prim: 'CAR' }],
                                                                        [{
                                                                          prim: 'DUP',
                                                                          args: [{ int: '6' }]
                                                                        }, { prim: 'FAILWITH' }]]
                                                                  },
                                                                  { prim: 'DUP', args: [{ int: '3' }] },
                                                                  { prim: 'CAR' },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'CAR' },
                                                                  { prim: 'CAR' },
                                                                  { prim: 'SWAP' },
                                                                  { prim: 'DUP' },
                                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                                  { prim: 'PAIR' },
                                                                  { prim: 'DIG', args: [{ int: '2' }] },
                                                                  { prim: 'DUP', args: [{ int: '5' }] },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'DIG', args: [{ int: '2' }] },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'DUP' },
                                                                  { prim: 'DUP', args: [{ int: '4' }] },
                                                                  { prim: 'GET' },
                                                                  {
                                                                    prim: 'IF_NONE',
                                                                    args: [[{
                                                                      prim: 'PUSH',
                                                                      args: [{ prim: 'nat' }, { int: '0' }]
                                                                    }], []]
                                                                  },
                                                                  { prim: 'DUP', args: [{ int: '3' }] },
                                                                  { prim: 'SWAP' },
                                                                  { prim: 'DUP' },
                                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                                  { prim: 'SUB' },
                                                                  { prim: 'ISNAT' },
                                                                  {
                                                                    prim: 'IF_NONE',
                                                                    args:
                                                                      [[{ prim: 'SWAP' },
                                                                        { prim: 'DROP' },
                                                                        { prim: 'DIG', args: [{ int: '2' }] },
                                                                        { prim: 'DROP' },
                                                                        { prim: 'SWAP' },
                                                                        { prim: 'PAIR' },
                                                                        {
                                                                          prim: 'PUSH',
                                                                          args: [{ prim: 'string' }, { string: 'FA2_INSUFFICIENT_BALANCE' }]
                                                                        },
                                                                        { prim: 'PAIR' },
                                                                        { prim: 'FAILWITH' }],
                                                                        [{ prim: 'SWAP' },
                                                                          { prim: 'DROP' },
                                                                          { prim: 'DIG', args: [{ int: '2' }] },
                                                                          { prim: 'DROP' },
                                                                          {
                                                                            prim: 'PUSH',
                                                                            args: [{ prim: 'nat' }, { int: '0' }]
                                                                          },
                                                                          { prim: 'SWAP' },
                                                                          { prim: 'DUP' },
                                                                          { prim: 'DUG', args: [{ int: '2' }] },
                                                                          { prim: 'COMPARE' },
                                                                          { prim: 'EQ' },
                                                                          {
                                                                            prim: 'IF',
                                                                            args:
                                                                              [[{ prim: 'DROP' },
                                                                                { prim: 'SWAP' },
                                                                                {
                                                                                  prim: 'NONE',
                                                                                  args: [{ prim: 'nat' }]
                                                                                },
                                                                                { prim: 'SWAP' },
                                                                                { prim: 'UPDATE' }],
                                                                                [{ prim: 'SOME' }, {
                                                                                  prim: 'DIG',
                                                                                  args: [{ int: '2' }]
                                                                                }, { prim: 'UPDATE' }]]
                                                                          }]]
                                                                  },
                                                                  { prim: 'SWAP' },
                                                                  { prim: 'PAIR' },
                                                                  { prim: 'DUP', args: [{ int: '3' }] },
                                                                  { prim: 'CAR' },
                                                                  { prim: 'DIG', args: [{ int: '3' }] },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'DIG', args: [{ int: '2' }] },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'DUP' },
                                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                                  { prim: 'DUP', args: [{ int: '4' }] },
                                                                  { prim: 'GET' },
                                                                  {
                                                                    prim: 'IF_NONE',
                                                                    args: [[{
                                                                      prim: 'PUSH',
                                                                      args: [{ prim: 'nat' }, { int: '0' }]
                                                                    }], []]
                                                                  },
                                                                  { prim: 'ADD' },
                                                                  {
                                                                    prim: 'PUSH',
                                                                    args: [{ prim: 'nat' }, { int: '0' }]
                                                                  },
                                                                  { prim: 'SWAP' },
                                                                  { prim: 'DUP' },
                                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                                  { prim: 'COMPARE' },
                                                                  { prim: 'EQ' },
                                                                  {
                                                                    prim: 'IF',
                                                                    args:
                                                                      [[{ prim: 'DROP' },
                                                                        { prim: 'SWAP' },
                                                                        { prim: 'NONE', args: [{ prim: 'nat' }] },
                                                                        { prim: 'SWAP' },
                                                                        { prim: 'UPDATE' }],
                                                                        [{ prim: 'SOME' }, {
                                                                          prim: 'DIG',
                                                                          args: [{ int: '2' }]
                                                                        }, { prim: 'UPDATE' }]]
                                                                  },
                                                                  { prim: 'SWAP' },
                                                                  { prim: 'DUP' },
                                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'DUP', args: [{ int: '3' }] },
                                                                  { prim: 'CAR' },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'DUP', args: [{ int: '4' }] },
                                                                  { prim: 'CAR' },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'CAR' },
                                                                  { prim: 'CDR' },
                                                                  { prim: 'DIG', args: [{ int: '3' }] },
                                                                  { prim: 'PAIR' },
                                                                  { prim: 'PAIR' },
                                                                  { prim: 'DIG', args: [{ int: '2' }] },
                                                                  { prim: 'CAR' },
                                                                  { prim: 'CAR' },
                                                                  { prim: 'PAIR' },
                                                                  { prim: 'PAIR' }]]
                                                          }]]
                                                    },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DROP' }]]
                                              },
                                                { prim: 'SWAP' },
                                                { prim: 'DROP' },
                                                { prim: 'SWAP' },
                                                { prim: 'DROP' },
                                                { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                { prim: 'PAIR' }]]
                                        }],
                                          [{ prim: 'DIG', args: [{ int: '3' }] },
                                            { prim: 'DROP' },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'SWAP' },
                                            {
                                              prim: 'ITER',
                                              args:
                                                [[{
                                                  prim: 'IF_LEFT',
                                                  args:
                                                    [[{ prim: 'UNIT' }, { prim: 'SOME' }, { prim: 'PAIR' }],
                                                      [{ prim: 'NONE', args: [{ prim: 'unit' }] }, { prim: 'PAIR' }]]
                                                },
                                                  { prim: 'UNPAIR' },
                                                  { prim: 'SWAP' },
                                                  { prim: 'DUP' },
                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'DUP', args: [{ int: '6' }] },
                                                  { prim: 'SWAP' },
                                                  { prim: 'DUP' },
                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                  { prim: 'COMPARE' },
                                                  { prim: 'EQ' },
                                                  {
                                                    prim: 'IF',
                                                    args:
                                                      [[{ prim: 'DROP' }],
                                                        [{ prim: 'DROP' },
                                                          {
                                                            prim: 'PUSH',
                                                            args: [{ prim: 'string' }, { string: 'OPERATION_PROHIBITED' }]
                                                          },
                                                          { prim: 'FAILWITH' }]]
                                                  },
                                                  { prim: 'SWAP' },
                                                  { prim: 'DUP' },
                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'SENDER' },
                                                  { prim: 'COMPARE' },
                                                  { prim: 'EQ' },
                                                  {
                                                    prim: 'IF',
                                                    args:
                                                      [[{ prim: 'DUP', args: [{ int: '3' }] },
                                                        { prim: 'CDR' },
                                                        { prim: 'DUP', args: [{ int: '4' }] },
                                                        { prim: 'CAR' },
                                                        { prim: 'CDR' },
                                                        { prim: 'DIG', args: [{ int: '2' }] },
                                                        { prim: 'DUP', args: [{ int: '4' }] },
                                                        { prim: 'CDR' },
                                                        { prim: 'CAR' },
                                                        { prim: 'DIG', args: [{ int: '4' }] },
                                                        { prim: 'CAR' },
                                                        { prim: 'PAIR' },
                                                        { prim: 'UPDATE' },
                                                        { prim: 'DIG', args: [{ int: '2' }] },
                                                        { prim: 'CAR' },
                                                        { prim: 'CAR' },
                                                        { prim: 'PAIR' },
                                                        { prim: 'PAIR' }],
                                                        [{ prim: 'DROP', args: [{ int: '3' }] },
                                                          {
                                                            prim: 'PUSH',
                                                            args: [{ prim: 'string' }, { string: 'FA2_NOT_OWNER' }]
                                                          },
                                                          { prim: 'FAILWITH' }]]
                                                  }]]
                                            },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'DROP' },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CDR' },
                                            { prim: 'SWAP' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'NIL', args: [{ prim: 'operation' }] },
                                            { prim: 'PAIR' }]]
                                    }]]
                            }],
                            [{ prim: 'DIG', args: [{ int: '4' }] },
                              { prim: 'DROP' },
                              { prim: 'DIG', args: [{ int: '4' }] },
                              { prim: 'DROP' },
                              {
                                prim: 'IF_LEFT',
                                args:
                                  [[{
                                    prim: 'IF_LEFT',
                                    args:
                                      [[{
                                        prim: 'IF_LEFT',
                                        args:
                                          [[{ prim: 'DROP' },
                                            { prim: 'SWAP' },
                                            { prim: 'DROP' },
                                            { prim: 'SWAP' },
                                            { prim: 'DROP' },
                                            { prim: 'DUP' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            {
                                              prim: 'IF_NONE',
                                              args:
                                                [[{
                                                  prim: 'PUSH',
                                                  args: [{ prim: 'string' }, { string: 'NO_RUNNING_MIGRATION' }]
                                                },
                                                  { prim: 'FAILWITH' }],
                                                  [{ prim: 'SENDER' },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'COMPARE' },
                                                    { prim: 'EQ' },
                                                    {
                                                      prim: 'IF',
                                                      args:
                                                        [[{ prim: 'NONE', args: [{ prim: 'address' }] },
                                                          { prim: 'SWAP' },
                                                          { prim: 'PAIR' }],
                                                          [{ prim: 'DROP' },
                                                            {
                                                              prim: 'PUSH',
                                                              args: [{ prim: 'string' }, { string: 'WRONG_MIGRATION' }]
                                                            },
                                                            { prim: 'FAILWITH' }]]
                                                    }]]
                                            },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'CAR' },
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
                                            [{ prim: 'SWAP' },
                                              { prim: 'DIG', args: [{ int: '2' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'EXEC' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'CAR' },
                                              { prim: 'CDR' },
                                              { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                              { prim: 'PAIR' },
                                              { prim: 'SWAP' },
                                              {
                                                prim: 'ITER',
                                                args:
                                                  [[{ prim: 'SWAP' },
                                                    { prim: 'UNPAIR' },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'CDR' },
                                                    { prim: 'DUP', args: [{ int: '3' }] },
                                                    { prim: 'CAR' },
                                                    { prim: 'CAR' },
                                                    { prim: 'DUP', args: [{ int: '7' }] },
                                                    { prim: 'PAIR' },
                                                    { prim: 'DUP', args: [{ int: '5' }] },
                                                    { prim: 'CAR' },
                                                    { prim: 'DUP', args: [{ int: '6' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '3' }] },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'DUP', args: [{ int: '4' }] },
                                                    { prim: 'GET' },
                                                    {
                                                      prim: 'IF_NONE',
                                                      args: [[{
                                                        prim: 'PUSH',
                                                        args: [{ prim: 'nat' }, { int: '0' }]
                                                      }], []]
                                                    },
                                                    { prim: 'ADD' },
                                                    { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'COMPARE' },
                                                    { prim: 'EQ' },
                                                    {
                                                      prim: 'IF',
                                                      args:
                                                        [[{ prim: 'DROP' },
                                                          { prim: 'SWAP' },
                                                          { prim: 'NONE', args: [{ prim: 'nat' }] },
                                                          { prim: 'SWAP' },
                                                          { prim: 'UPDATE' }],
                                                          [{ prim: 'SOME' }, {
                                                            prim: 'DIG',
                                                            args: [{ int: '2' }]
                                                          }, { prim: 'UPDATE' }]]
                                                    },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'ADD' },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DUP', args: [{ int: '4' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'DIG', args: [{ int: '4' }] },
                                                    { prim: 'CAR' },
                                                    { prim: 'CDR' },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'PAIR' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'CAR' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'SWAP' },
                                                    { prim: 'CAR' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'ADD' },
                                                    { prim: 'PAIR' }]]
                                              },
                                              { prim: 'DIG', args: [{ int: '2' }] },
                                              { prim: 'DROP' },
                                              { prim: 'UNPAIR' },
                                              { prim: 'DUP', args: [{ int: '3' }] },
                                              { prim: 'CDR' },
                                              { prim: 'CDR' },
                                              { prim: 'CAR' },
                                              { prim: 'CAR' },
                                              { prim: 'ADD' },
                                              { prim: 'DUP', args: [{ int: '3' }] },
                                              { prim: 'CDR' },
                                              { prim: 'CDR' },
                                              { prim: 'CAR' },
                                              { prim: 'CDR' },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'COMPARE' },
                                              { prim: 'LE' },
                                              {
                                                prim: 'IF',
                                                args:
                                                  [[{ prim: 'DUP', args: [{ int: '3' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'DUP', args: [{ int: '4' }] },
                                                    { prim: 'CAR' },
                                                    { prim: 'CAR' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'CDR' },
                                                    { prim: 'UNPAIR' },
                                                    { prim: 'CDR' },
                                                    { prim: 'DIG', args: [{ int: '3' }] },
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
                                                    [{ prim: 'DROP', args: [{ int: '3' }] },
                                                      {
                                                        prim: 'PUSH',
                                                        args: [{ prim: 'string' }, { string: 'RESERVE_DEPLETED' }]
                                                      },
                                                      { prim: 'FAILWITH' }]]
                                              }]]
                                      }],
                                        [{ prim: 'DIG', args: [{ int: '3' }] },
                                          { prim: 'DROP' },
                                          { prim: 'SWAP' },
                                          { prim: 'DIG', args: [{ int: '2' }] },
                                          { prim: 'SWAP' },
                                          { prim: 'EXEC' },
                                          { prim: 'SWAP' },
                                          { prim: 'SOME' },
                                          { prim: 'SWAP' },
                                          { prim: 'DUP' },
                                          { prim: 'DUG', args: [{ int: '2' }] },
                                          { prim: 'CDR' },
                                          { prim: 'CDR' },
                                          { prim: 'CDR' },
                                          { prim: 'CAR' },
                                          { prim: 'PAIR' },
                                          { prim: 'SWAP' },
                                          { prim: 'DUP' },
                                          { prim: 'DUG', args: [{ int: '2' }] },
                                          { prim: 'CDR' },
                                          { prim: 'CDR' },
                                          { prim: 'CAR' },
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
                                          { prim: 'PAIR' }]]
                                  }],
                                    [{ prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'DROP' },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'DUP' },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'SENDER' },
                                      { prim: 'COMPARE' },
                                      { prim: 'NEQ' },
                                      {
                                        prim: 'IF',
                                        args:
                                          [[{ prim: 'DROP' },
                                            { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'NOT_A_MINTER' }] },
                                            { prim: 'FAILWITH' }],
                                            [{ prim: 'DROP' }]]
                                      },
                                      {
                                        prim: 'IF_LEFT',
                                        args:
                                          [[{ prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'SWAP' },
                                            {
                                              prim: 'ITER',
                                              args:
                                                [[{ prim: 'DUP' },
                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'DUP', args: [{ int: '6' }] },
                                                  { prim: 'SWAP' },
                                                  { prim: 'DUP' },
                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                  { prim: 'COMPARE' },
                                                  { prim: 'EQ' },
                                                  {
                                                    prim: 'IF',
                                                    args:
                                                      [[],
                                                        [{ prim: 'DROP' },
                                                          {
                                                            prim: 'PUSH',
                                                            args: [{ prim: 'string' }, { string: 'BAD_MINT_BURN' }]
                                                          },
                                                          { prim: 'FAILWITH' }]]
                                                  },
                                                  { prim: 'PAIR' },
                                                  { prim: 'SWAP' },
                                                  { prim: 'DUP' },
                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'DIG', args: [{ int: '2' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'DIG', args: [{ int: '2' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'DUP' },
                                                  { prim: 'DUP', args: [{ int: '4' }] },
                                                  { prim: 'GET' },
                                                  {
                                                    prim: 'IF_NONE',
                                                    args: [[{
                                                      prim: 'PUSH',
                                                      args: [{ prim: 'nat' }, { int: '0' }]
                                                    }], []]
                                                  },
                                                  { prim: 'DUP', args: [{ int: '3' }] },
                                                  { prim: 'SWAP' },
                                                  { prim: 'DUP' },
                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                  { prim: 'SUB' },
                                                  { prim: 'ISNAT' },
                                                  {
                                                    prim: 'IF_NONE',
                                                    args:
                                                      [[{ prim: 'SWAP' },
                                                        { prim: 'DROP' },
                                                        { prim: 'DIG', args: [{ int: '2' }] },
                                                        { prim: 'DROP' },
                                                        { prim: 'SWAP' },
                                                        { prim: 'PAIR' },
                                                        {
                                                          prim: 'PUSH',
                                                          args: [{ prim: 'string' }, { string: 'FA2_INSUFFICIENT_BALANCE' }]
                                                        },
                                                        { prim: 'PAIR' },
                                                        { prim: 'FAILWITH' }],
                                                        [{ prim: 'SWAP' },
                                                          { prim: 'DROP' },
                                                          { prim: 'DIG', args: [{ int: '2' }] },
                                                          { prim: 'DROP' },
                                                          { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                                          { prim: 'SWAP' },
                                                          { prim: 'DUP' },
                                                          { prim: 'DUG', args: [{ int: '2' }] },
                                                          { prim: 'COMPARE' },
                                                          { prim: 'EQ' },
                                                          {
                                                            prim: 'IF',
                                                            args:
                                                              [[{ prim: 'DROP' },
                                                                { prim: 'SWAP' },
                                                                { prim: 'NONE', args: [{ prim: 'nat' }] },
                                                                { prim: 'SWAP' },
                                                                { prim: 'UPDATE' }],
                                                                [{ prim: 'SOME' }, {
                                                                  prim: 'DIG',
                                                                  args: [{ int: '2' }]
                                                                }, { prim: 'UPDATE' }]]
                                                          }]]
                                                  }]]
                                            },
                                            { prim: 'DIG', args: [{ int: '3' }] },
                                            { prim: 'DROP' },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CDR' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CDR' },
                                            { prim: 'SWAP' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'NIL', args: [{ prim: 'operation' }] },
                                            { prim: 'PAIR' }],
                                            [{ prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'CAR' },
                                              { prim: 'CDR' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'CAR' },
                                              { prim: 'CAR' },
                                              { prim: 'SWAP' },
                                              {
                                                prim: 'ITER',
                                                args:
                                                  [[{ prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'CAR' },
                                                    { prim: 'DUP', args: [{ int: '6' }] },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'COMPARE' },
                                                    { prim: 'EQ' },
                                                    {
                                                      prim: 'IF',
                                                      args:
                                                        [[],
                                                          [{ prim: 'DROP' },
                                                            {
                                                              prim: 'PUSH',
                                                              args: [{ prim: 'string' }, { string: 'BAD_MINT_BURN' }]
                                                            },
                                                            { prim: 'FAILWITH' }]]
                                                    },
                                                    { prim: 'PAIR' },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'CAR' },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'CDR' },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'DUP', args: [{ int: '4' }] },
                                                    { prim: 'GET' },
                                                    {
                                                      prim: 'IF_NONE',
                                                      args: [[{
                                                        prim: 'PUSH',
                                                        args: [{ prim: 'nat' }, { int: '0' }]
                                                      }], []]
                                                    },
                                                    { prim: 'ADD' },
                                                    { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'COMPARE' },
                                                    { prim: 'EQ' },
                                                    {
                                                      prim: 'IF',
                                                      args:
                                                        [[{ prim: 'DROP' },
                                                          { prim: 'SWAP' },
                                                          { prim: 'NONE', args: [{ prim: 'nat' }] },
                                                          { prim: 'SWAP' },
                                                          { prim: 'UPDATE' }],
                                                          [{ prim: 'SOME' }, {
                                                            prim: 'DIG',
                                                            args: [{ int: '2' }]
                                                          }, { prim: 'UPDATE' }]]
                                                    }]]
                                              },
                                              { prim: 'DIG', args: [{ int: '3' }] },
                                              { prim: 'DROP' },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'CDR' },
                                              { prim: 'DIG', args: [{ int: '2' }] },
                                              { prim: 'CAR' },
                                              { prim: 'CDR' },
                                              { prim: 'DIG', args: [{ int: '2' }] },
                                              { prim: 'PAIR' },
                                              { prim: 'PAIR' },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'CDR' },
                                              { prim: 'SWAP' },
                                              { prim: 'DIG', args: [{ int: '2' }] },
                                              { prim: 'CAR' },
                                              { prim: 'CAR' },
                                              { prim: 'PAIR' },
                                              { prim: 'PAIR' },
                                              { prim: 'NIL', args: [{ prim: 'operation' }] },
                                              { prim: 'PAIR' }]]
                                      }]]
                              }]]
                      }]]
                }]]
          }],
      storage:
        [[{
          prim: 'Pair',
          args:
            [{
              prim: 'Pair',
              args:
                [{ bytes: '01b1f2a806608e615074cce263acd83220ba9b83f700' },
                  { bytes: '018d475b2ffa2ca4756989bd9c9506318d1f98442100' }]
            },
              { prim: 'Pair', args: [{ prim: 'False' }, { prim: 'None' }] }]
        },
          { prim: 'Pair', args: [{ int: '1777' }, { int: '1778' }] },
          { int: '1779' },
          { int: '1918074758312695' }],
          { int: '1780' },
          {
            prim: 'Pair',
            args: [{ int: '1918074758312695' }, { int: '10000000000000000' }]
          },
          { bytes: '0165269b3bae68d6da4d2eca8e5b040372fd64e38200' },
          { prim: 'None' }]
    },
  entrypoints:
    {
      entrypoints:
        {
          update_operators:
            {
              prim: 'list',
              args:
                [{
                  prim: 'or',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'address', annots: ['%owner'] },
                          { prim: 'address', annots: ['%operator'] },
                          { prim: 'nat', annots: ['%token_id'] }],
                      annots: ['%add_operator']
                    },
                      {
                        prim: 'pair',
                        args:
                          [{ prim: 'address', annots: ['%owner'] },
                            { prim: 'address', annots: ['%operator'] },
                            { prim: 'nat', annots: ['%token_id'] }],
                        annots: ['%remove_operator']
                      }]
                }]
            },
          transfer:
            {
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
                                { prim: 'nat', annots: ['%token_id'] },
                                { prim: 'nat', annots: ['%amount'] }]
                          }],
                        annots: ['%txs']
                      }]
                }]
            },
          tokens:
            {
              prim: 'or',
              args:
                [{
                  prim: 'list',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'address', annots: ['%owner'] },
                          { prim: 'nat', annots: ['%token_id'] },
                          { prim: 'nat', annots: ['%amount'] }]
                    }],
                  annots: ['%burn_tokens']
                },
                  {
                    prim: 'list',
                    args:
                      [{
                        prim: 'pair',
                        args:
                          [{ prim: 'address', annots: ['%owner'] },
                            { prim: 'nat', annots: ['%token_id'] },
                            { prim: 'nat', annots: ['%amount'] }]
                      }],
                    annots: ['%mint_tokens']
                  }]
            },
          set_minter: { prim: 'address' },
          set_admin: { prim: 'address' },
          pause:
            {
              prim: 'list',
              args:
                [{
                  prim: 'pair',
                  args:
                    [{ prim: 'nat', annots: ['%token_id'] },
                      { prim: 'bool', annots: ['%paused'] }]
                }]
            },
          oracle:
            {
              prim: 'or',
              args:
                [{
                  prim: 'or',
                  args:
                    [{ prim: 'unit', annots: ['%confirm_oracle_migration'] },
                      {
                        prim: 'list',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{ prim: 'address', annots: ['%to_'] }, { prim: 'nat', annots: ['%amount'] }]
                          }],
                        annots: ['%distribute']
                      }]
                },
                  { prim: 'address', annots: ['%migrate_oracle'] }]
            },
          mint_tokens:
            {
              prim: 'list',
              args:
                [{
                  prim: 'pair',
                  args:
                    [{ prim: 'address', annots: ['%owner'] },
                      { prim: 'nat', annots: ['%token_id'] },
                      { prim: 'nat', annots: ['%amount'] }]
                }]
            },
          migrate_oracle: { prim: 'address' },
          distribute:
            {
              prim: 'list',
              args:
                [{
                  prim: 'pair',
                  args:
                    [{ prim: 'address', annots: ['%to_'] }, { prim: 'nat', annots: ['%amount'] }]
                }]
            },
          confirm_oracle_migration: { prim: 'unit' },
          confirm_admin: { prim: 'unit' },
          burn_tokens:
            {
              prim: 'list',
              args:
                [{
                  prim: 'pair',
                  args:
                    [{ prim: 'address', annots: ['%owner'] },
                      { prim: 'nat', annots: ['%token_id'] },
                      { prim: 'nat', annots: ['%amount'] }]
                }]
            },
          balance_of:
            {
              prim: 'pair',
              args:
                [{
                  prim: 'list',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'address', annots: ['%owner'] },
                          { prim: 'nat', annots: ['%token_id'] }]
                    }],
                  annots: ['%requests']
                },
                  {
                    prim: 'contract',
                    args:
                      [{
                        prim: 'list',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{ prim: 'address', annots: ['%owner'] },
                                    { prim: 'nat', annots: ['%token_id'] }],
                                annots: ['%request']
                              },
                                { prim: 'nat', annots: ['%balance'] }]
                          }]
                      }],
                    annots: ['%callback']
                  }]
            },
          assets:
            {
              prim: 'or',
              args:
                [{
                  prim: 'or',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{
                          prim: 'list',
                          args:
                            [{
                              prim: 'pair',
                              args:
                                [{ prim: 'address', annots: ['%owner'] },
                                  { prim: 'nat', annots: ['%token_id'] }]
                            }],
                          annots: ['%requests']
                        },
                          {
                            prim: 'contract',
                            args:
                              [{
                                prim: 'list',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'address', annots: ['%owner'] },
                                            { prim: 'nat', annots: ['%token_id'] }],
                                        annots: ['%request']
                                      },
                                        { prim: 'nat', annots: ['%balance'] }]
                                  }]
                              }],
                            annots: ['%callback']
                          }],
                      annots: ['%balance_of']
                    },
                      {
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
                                          { prim: 'nat', annots: ['%token_id'] },
                                          { prim: 'nat', annots: ['%amount'] }]
                                    }],
                                  annots: ['%txs']
                                }]
                          }],
                        annots: ['%transfer']
                      }]
                },
                  {
                    prim: 'list',
                    args:
                      [{
                        prim: 'or',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{ prim: 'address', annots: ['%owner'] },
                                { prim: 'address', annots: ['%operator'] },
                                { prim: 'nat', annots: ['%token_id'] }],
                            annots: ['%add_operator']
                          },
                            {
                              prim: 'pair',
                              args:
                                [{ prim: 'address', annots: ['%owner'] },
                                  { prim: 'address', annots: ['%operator'] },
                                  { prim: 'nat', annots: ['%token_id'] }],
                              annots: ['%remove_operator']
                            }]
                      }],
                    annots: ['%update_operators']
                  }]
            },
          admin:
            {
              prim: 'or',
              args:
                [{
                  prim: 'or',
                  args:
                    [{ prim: 'unit', annots: ['%confirm_admin'] },
                      {
                        prim: 'list',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{ prim: 'nat', annots: ['%token_id'] },
                                { prim: 'bool', annots: ['%paused'] }]
                          }],
                        annots: ['%pause']
                      }]
                },
                  {
                    prim: 'or',
                    args:
                      [{ prim: 'address', annots: ['%set_admin'] },
                        { prim: 'address', annots: ['%set_minter'] }]
                  }]
            }
        }
    }
};