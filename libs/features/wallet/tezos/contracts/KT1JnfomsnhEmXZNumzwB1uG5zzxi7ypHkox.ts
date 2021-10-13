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
                                      [{ prim: 'nat', annots: ['%token_id'] }, { prim: 'nat', annots: ['%amount'] }]
                                  }]
                            }],
                          annots: ['%mint_tokens']
                        }],
                    annots: ['%tokens']
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
                                  args: [{ prim: 'nat' }, { prim: 'address' }],
                                  annots: ['%ledger']
                                },
                                  {
                                    prim: 'big_map',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'address' },
                                            { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                                      },
                                        { prim: 'unit' }],
                                    annots: ['%operators']
                                  }]
                            },
                              {
                                prim: 'map',
                                args: [{ prim: 'string' }, { prim: 'bytes' }],
                                annots: ['%token_info']
                              }],
                          annots: ['%assets']
                        }]
                  },
                    {
                      prim: 'big_map',
                      args: [{ prim: 'string' }, { prim: 'bytes' }],
                      annots: ['%metadata']
                    }]
              }]
          },
          {
            prim: 'code',
            args:
              [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'FA2_TOKEN_UNDEFINED' }] },
                {
                  prim: 'PUSH',
                  args: [{ prim: 'string' }, { string: 'FA2_INSUFFICIENT_BALANCE' }]
                },
                {
                  prim: 'PUSH',
                  args: [{ prim: 'string' }, { string: 'INVALID_MINT_BURN_PARAMETER' }]
                },
                { prim: 'DUP' },
                {
                  prim: 'LAMBDA',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'string' },
                          {
                            prim: 'pair',
                            args:
                              [{ prim: 'address' },
                                { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                          }]
                    },
                      { prim: 'unit' },
                      [{ prim: 'UNPAIR' },
                        { prim: 'SWAP' },
                        { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1' }] },
                        { prim: 'SWAP' },
                        { prim: 'GET', args: [{ int: '4' }] },
                        { prim: 'COMPARE' },
                        { prim: 'NEQ' },
                        {
                          prim: 'IF',
                          args:
                            [[{ prim: 'FAILWITH' }],
                              [{ prim: 'DROP' }, { prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] }]]
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
                { prim: 'DIG', args: [{ int: '5' }] },
                { prim: 'UNPAIR' },
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
                          [[{ prim: 'DIG', args: [{ int: '3' }] },
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
                            [{ prim: 'DIG', args: [{ int: '2' }] },
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
                              { prim: 'SWAP' },
                              { prim: 'DUP' },
                              { prim: 'DUG', args: [{ int: '2' }] },
                              { prim: 'CAR' },
                              { prim: 'CDR' },
                              { prim: 'SWAP' },
                              {
                                prim: 'IF_LEFT',
                                args:
                                  [[{
                                    prim: 'IF_LEFT',
                                    args:
                                      [[{ prim: 'DIG', args: [{ int: '3' }] },
                                        { prim: 'DROP' },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'CAR' },
                                        {
                                          prim: 'MAP',
                                          args:
                                            [[{ prim: 'DUP', args: [{ int: '3' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'CDR' },
                                              { prim: 'GET' },
                                              {
                                                prim: 'IF_NONE',
                                                args:
                                                  [[{ prim: 'DROP' }, {
                                                    prim: 'DUP',
                                                    args: [{ int: '5' }]
                                                  }, { prim: 'FAILWITH' }],
                                                    [{ prim: 'SWAP' },
                                                      { prim: 'DUP' },
                                                      { prim: 'CAR' },
                                                      { prim: 'DIG', args: [{ int: '2' }] },
                                                      { prim: 'COMPARE' },
                                                      { prim: 'EQ' },
                                                      {
                                                        prim: 'IF',
                                                        args:
                                                          [[{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1' }] }],
                                                            [{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] }]]
                                                      },
                                                      { prim: 'SWAP' },
                                                      { prim: 'PAIR' }]]
                                              }]]
                                        },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'DROP' },
                                        { prim: 'DIG', args: [{ int: '4' }] },
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
                                        [{ prim: 'SWAP' },
                                          { prim: 'DUP' },
                                          { prim: 'DUG', args: [{ int: '2' }] },
                                          { prim: 'CAR' },
                                          { prim: 'CAR' },
                                          { prim: 'DUP', args: [{ int: '3' }] },
                                          { prim: 'CAR' },
                                          { prim: 'CDR' },
                                          { prim: 'PAIR' },
                                          {
                                            prim: 'LAMBDA',
                                            args:
                                              [{
                                                prim: 'pair',
                                                args:
                                                  [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                                    {
                                                      prim: 'pair',
                                                      args:
                                                        [{ prim: 'nat' },
                                                          {
                                                            prim: 'big_map',
                                                            args:
                                                              [{
                                                                prim: 'pair',
                                                                args:
                                                                  [{ prim: 'address' },
                                                                    {
                                                                      prim: 'pair',
                                                                      args: [{ prim: 'address' }, { prim: 'nat' }]
                                                                    }]
                                                              },
                                                                { prim: 'unit' }]
                                                          }]
                                                    }]
                                              },
                                                { prim: 'unit' },
                                                [{ prim: 'UNPAIR' },
                                                  { prim: 'UNPAIR' },
                                                  { prim: 'DIG', args: [{ int: '2' }] },
                                                  { prim: 'UNPAIR' },
                                                  { prim: 'DUP', args: [{ int: '4' }] },
                                                  { prim: 'DUP', args: [{ int: '4' }] },
                                                  { prim: 'COMPARE' },
                                                  { prim: 'EQ' },
                                                  {
                                                    prim: 'IF',
                                                    args:
                                                      [[{ prim: 'DROP', args: [{ int: '4' }] }, { prim: 'UNIT' }],
                                                        [{ prim: 'DIG', args: [{ int: '3' }] },
                                                          { prim: 'PAIR' },
                                                          { prim: 'DIG', args: [{ int: '2' }] },
                                                          { prim: 'PAIR' },
                                                          { prim: 'MEM' },
                                                          {
                                                            prim: 'IF',
                                                            args:
                                                              [[{ prim: 'UNIT' }],
                                                                [{
                                                                  prim: 'PUSH',
                                                                  args: [{ prim: 'string' }, { string: 'FA2_NOT_OPERATOR' }]
                                                                },
                                                                  { prim: 'FAILWITH' }]]
                                                          }]]
                                                  }]]
                                          },
                                          { prim: 'DUG', args: [{ int: '2' }] },
                                          { prim: 'UNPAIR' },
                                          { prim: 'SWAP' },
                                          { prim: 'DIG', args: [{ int: '2' }] },
                                          {
                                            prim: 'ITER',
                                            args:
                                              [[{ prim: 'DUP' },
                                                { prim: 'DUG', args: [{ int: '2' }] },
                                                { prim: 'CDR' },
                                                {
                                                  prim: 'ITER',
                                                  args:
                                                    [[{ prim: 'SWAP' },
                                                      { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                                      { prim: 'DUP', args: [{ int: '3' }] },
                                                      { prim: 'GET', args: [{ int: '4' }] },
                                                      { prim: 'COMPARE' },
                                                      { prim: 'EQ' },
                                                      {
                                                        prim: 'IF',
                                                        args:
                                                          [[{ prim: 'SWAP' }, { prim: 'DROP' }],
                                                            [{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1' }] },
                                                              { prim: 'DUP', args: [{ int: '3' }] },
                                                              { prim: 'GET', args: [{ int: '4' }] },
                                                              { prim: 'COMPARE' },
                                                              { prim: 'NEQ' },
                                                              {
                                                                prim: 'IF',
                                                                args:
                                                                  [[{ prim: 'DROP', args: [{ int: '2' }] },
                                                                    { prim: 'DUP', args: [{ int: '6' }] },
                                                                    { prim: 'FAILWITH' }],
                                                                    [{ prim: 'DUP' },
                                                                      { prim: 'DUP', args: [{ int: '3' }] },
                                                                      { prim: 'GET', args: [{ int: '3' }] },
                                                                      { prim: 'GET' },
                                                                      {
                                                                        prim: 'IF_NONE',
                                                                        args:
                                                                          [[{ prim: 'DROP', args: [{ int: '2' }] },
                                                                            { prim: 'DUP', args: [{ int: '7' }] },
                                                                            { prim: 'FAILWITH' }],
                                                                            [{ prim: 'DUP', args: [{ int: '4' }] },
                                                                              { prim: 'CAR' },
                                                                              { prim: 'SWAP' },
                                                                              { prim: 'DUP' },
                                                                              { prim: 'DUG', args: [{ int: '2' }] },
                                                                              { prim: 'COMPARE' },
                                                                              { prim: 'NEQ' },
                                                                              {
                                                                                prim: 'IF',
                                                                                args:
                                                                                  [[{
                                                                                    prim: 'DROP',
                                                                                    args: [{ int: '3' }]
                                                                                  },
                                                                                    {
                                                                                      prim: 'DUP',
                                                                                      args: [{ int: '6' }]
                                                                                    },
                                                                                    { prim: 'FAILWITH' }],
                                                                                    [{
                                                                                      prim: 'DUP',
                                                                                      args: [{ int: '5' }]
                                                                                    },
                                                                                      {
                                                                                        prim: 'DUP',
                                                                                        args: [{ int: '4' }]
                                                                                      },
                                                                                      {
                                                                                        prim: 'GET',
                                                                                        args: [{ int: '3' }]
                                                                                      },
                                                                                      { prim: 'PAIR' },
                                                                                      { prim: 'SENDER' },
                                                                                      {
                                                                                        prim: 'DIG',
                                                                                        args: [{ int: '2' }]
                                                                                      },
                                                                                      { prim: 'PAIR' },
                                                                                      { prim: 'PAIR' },
                                                                                      {
                                                                                        prim: 'DUP',
                                                                                        args: [{ int: '6' }]
                                                                                      },
                                                                                      { prim: 'SWAP' },
                                                                                      { prim: 'EXEC' },
                                                                                      { prim: 'DROP' },
                                                                                      { prim: 'SWAP' },
                                                                                      { prim: 'DUP' },
                                                                                      {
                                                                                        prim: 'DUG',
                                                                                        args: [{ int: '2' }]
                                                                                      },
                                                                                      { prim: 'CAR' },
                                                                                      { prim: 'SOME' },
                                                                                      {
                                                                                        prim: 'DIG',
                                                                                        args: [{ int: '2' }]
                                                                                      },
                                                                                      {
                                                                                        prim: 'GET',
                                                                                        args: [{ int: '3' }]
                                                                                      },
                                                                                      { prim: 'UPDATE' }]]
                                                                              }]]
                                                                      }]]
                                                              }]]
                                                      }]]
                                                },
                                                { prim: 'SWAP' },
                                                { prim: 'DROP' }]]
                                          },
                                          { prim: 'SWAP' },
                                          { prim: 'DROP' },
                                          { prim: 'SWAP' },
                                          { prim: 'DROP' },
                                          { prim: 'DIG', args: [{ int: '3' }] },
                                          { prim: 'DROP' },
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
                                          { prim: 'NIL', args: [{ prim: 'operation' }] },
                                          { prim: 'PAIR' }]]
                                  }],
                                    [{ prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'DROP' },
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'DROP' },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'SWAP' },
                                      { prim: 'SENDER' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      {
                                        prim: 'ITER',
                                        args:
                                          [[{ prim: 'SWAP' },
                                            { prim: 'DUP', args: [{ int: '3' }] },
                                            { prim: 'DUP', args: [{ int: '3' }] },
                                            { prim: 'IF_LEFT', args: [[], []] },
                                            { prim: 'CAR' },
                                            { prim: 'COMPARE' },
                                            { prim: 'EQ' },
                                            {
                                              prim: 'IF',
                                              args:
                                                [[],
                                                  [{
                                                    prim: 'PUSH',
                                                    args: [{ prim: 'string' }, { string: 'FA2_NOT_OWNER' }]
                                                  },
                                                    { prim: 'FAILWITH' }]]
                                            },
                                            { prim: 'SWAP' },
                                            {
                                              prim: 'IF_LEFT',
                                              args:
                                                [[{ prim: 'SWAP' },
                                                  { prim: 'UNIT' },
                                                  { prim: 'SOME' },
                                                  { prim: 'DUP', args: [{ int: '3' }] },
                                                  { prim: 'GET', args: [{ int: '4' }] },
                                                  { prim: 'DUP', args: [{ int: '4' }] },
                                                  { prim: 'GET', args: [{ int: '3' }] },
                                                  { prim: 'PAIR' },
                                                  { prim: 'DIG', args: [{ int: '3' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'UPDATE' }],
                                                  [{ prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'GET', args: [{ int: '4' }] },
                                                    { prim: 'DUP', args: [{ int: '3' }] },
                                                    { prim: 'GET', args: [{ int: '3' }] },
                                                    { prim: 'PAIR' },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'CAR' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'NONE', args: [{ prim: 'unit' }] },
                                                    { prim: 'SWAP' },
                                                    { prim: 'UPDATE' }]]
                                            }]]
                                      },
                                      { prim: 'SWAP' },
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
                              },
                              { prim: 'UNPAIR' },
                              { prim: 'DUP', args: [{ int: '3' }] },
                              { prim: 'CDR' },
                              { prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'CAR' },
                              { prim: 'CAR' },
                              { prim: 'PAIR' },
                              { prim: 'PAIR' },
                              { prim: 'SWAP' },
                              { prim: 'PAIR' }]]
                      }],
                      [{ prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'DROP' },
                        { prim: 'DIG', args: [{ int: '4' }] },
                        { prim: 'DROP' },
                        { prim: 'DIG', args: [{ int: '4' }] },
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
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'SWAP' },
                        {
                          prim: 'IF_LEFT',
                          args:
                            [[{
                              prim: 'ITER',
                              args:
                                [[{ prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'DUP', args: [{ int: '5' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DROP' },
                                  { prim: 'DUP' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'DUP', args: [{ int: '3' }] },
                                  { prim: 'GET', args: [{ int: '3' }] },
                                  { prim: 'GET' },
                                  {
                                    prim: 'IF_NONE',
                                    args:
                                      [[{ prim: 'DROP', args: [{ int: '2' }] },
                                        { prim: 'DUP', args: [{ int: '3' }] },
                                        { prim: 'FAILWITH' }],
                                        [{ prim: 'DUP', args: [{ int: '3' }] },
                                          { prim: 'CAR' },
                                          { prim: 'SWAP' },
                                          { prim: 'COMPARE' },
                                          { prim: 'EQ' },
                                          {
                                            prim: 'IF',
                                            args:
                                              [[{ prim: 'DUP' },
                                                { prim: 'CDR' },
                                                { prim: 'SWAP' },
                                                { prim: 'DUP' },
                                                { prim: 'DUG', args: [{ int: '2' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'DIG', args: [{ int: '2' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'GET', args: [{ int: '3' }] },
                                                { prim: 'NONE', args: [{ prim: 'address' }] },
                                                { prim: 'SWAP' },
                                                { prim: 'UPDATE' },
                                                { prim: 'PAIR' },
                                                { prim: 'PAIR' }],
                                                [{ prim: 'DROP', args: [{ int: '2' }] },
                                                  { prim: 'DUP', args: [{ int: '3' }] },
                                                  { prim: 'FAILWITH' }]]
                                          }]]
                                  }]]
                            },
                              { prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'DROP' },
                              { prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'DROP' }],
                              [{ prim: 'DIG', args: [{ int: '4' }] },
                                { prim: 'DROP' },
                                {
                                  prim: 'ITER',
                                  args:
                                    [[{ prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'DUP', args: [{ int: '5' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'EXEC' },
                                      { prim: 'DROP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUP', args: [{ int: '3' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'SWAP' },
                                      { prim: 'GET', args: [{ int: '3' }] },
                                      { prim: 'MEM' },
                                      {
                                        prim: 'IF',
                                        args:
                                          [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'USED_TOKEN_ID' }] },
                                            { prim: 'FAILWITH' }],
                                            []]
                                      },
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
                                      { prim: 'DUP', args: [{ int: '4' }] },
                                      { prim: 'CAR' },
                                      { prim: 'DIG', args: [{ int: '4' }] },
                                      { prim: 'GET', args: [{ int: '3' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'SOME' },
                                      { prim: 'SWAP' },
                                      { prim: 'UPDATE' },
                                      { prim: 'PAIR' },
                                      { prim: 'PAIR' }]]
                                },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'DROP' }]]
                        },
                        { prim: 'NIL', args: [{ prim: 'operation' }] },
                        { prim: 'DUP', args: [{ int: '3' }] },
                        { prim: 'CDR' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'PAIR' },
                        { prim: 'PAIR' },
                        { prim: 'SWAP' },
                        { prim: 'PAIR' }]]
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
                        [{ bytes: '01b1f2a806608e615074cce263acd83220ba9b83f700' },
                          { bytes: '018d475b2ffa2ca4756989bd9c9506318d1f98442100' }]
                    },
                      { prim: 'Pair', args: [{ prim: 'False' }, { prim: 'None' }] }]
                },
                  {
                    prim: 'Pair',
                    args:
                      [{ prim: 'Pair', args: [{ int: '13941' }, { int: '13942' }] },
                        [{ prim: 'Elt', args: [{ string: 'decimals' }, { bytes: '30' }] },
                          {
                            prim: 'Elt',
                            args:
                              [{ string: 'eth_contract' },
                                {
                                  bytes:
                                    '307862633463613065646137363437613861623763323036316332653131386131386139333666313364'
                                }]
                          },
                          {
                            prim: 'Elt',
                            args: [{ string: 'eth_name' }, { bytes: '426f7265644170655961636874436c7562' }]
                          },
                          { prim: 'Elt', args: [{ string: 'eth_symbol' }, { bytes: '42415943' }] },
                          { prim: 'Elt', args: [{ string: 'isBooleanAmount' }, { bytes: '74727565' }] },
                          {
                            prim: 'Elt',
                            args:
                              [{ string: 'name' },
                                { bytes: '5772617070656420426f7265644170655961636874436c7562' }]
                          },
                          { prim: 'Elt', args: [{ string: 'symbol' }, { bytes: '7742415943' }] }]]
                  }]
            },
              { int: '13943' }]
        }
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