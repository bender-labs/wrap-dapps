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
                            [{
                              prim: 'pair',
                              args:
                                [{ prim: 'nat' }, { prim: 'map', args: [{ prim: 'string' }, { prim: 'key' }] }],
                              annots: ['%change_quorum']
                            },
                              { prim: 'nat', annots: ['%change_threshold'] }]
                        },
                          {
                            prim: 'or',
                            args:
                              [{ prim: 'unit', annots: ['%confirm_admin'] },
                                { prim: 'address', annots: ['%set_admin'] }]
                          }],
                      annots: ['%admin']
                    },
                      {
                        prim: 'or',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{ prim: 'address', annots: ['%minter_contract'] },
                                {
                                  prim: 'list',
                                  args: [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }],
                                  annots: ['%tokens']
                                }],
                            annots: ['%distribute_tokens_with_quorum']
                          },
                            { prim: 'address', annots: ['%distribute_xtz_with_quorum'] }],
                        annots: ['%fees']
                      }]
                },
                  {
                    prim: 'or',
                    args:
                      [{
                        prim: 'pair',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{
                                prim: 'or',
                                args:
                                  [{
                                    prim: 'or',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'bytes', annots: ['%eth_contract'] },
                                            {
                                              prim: 'pair',
                                              args: [{ prim: 'address' }, { prim: 'nat' }],
                                              annots: ['%token_address']
                                            }],
                                        annots: ['%add_erc20']
                                      },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'bytes', annots: ['%eth_contract'] },
                                              { prim: 'address', annots: ['%token_contract'] }],
                                          annots: ['%add_erc721']
                                        }]
                                  },
                                    {
                                      prim: 'or',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'bytes', annots: ['%erc_20'] },
                                              {
                                                prim: 'pair',
                                                args:
                                                  [{
                                                    prim: 'pair',
                                                    args:
                                                      [{ prim: 'bytes', annots: ['%block_hash'] },
                                                        { prim: 'nat', annots: ['%log_index'] }],
                                                    annots: ['%event_id']
                                                  },
                                                    {
                                                      prim: 'pair',
                                                      args:
                                                        [{ prim: 'address', annots: ['%owner'] },
                                                          { prim: 'nat', annots: ['%amount'] }]
                                                    }]
                                              }],
                                          annots: ['%mint_erc20']
                                        },
                                          {
                                            prim: 'pair',
                                            args:
                                              [{ prim: 'bytes', annots: ['%erc_721'] },
                                                {
                                                  prim: 'pair',
                                                  args:
                                                    [{
                                                      prim: 'pair',
                                                      args:
                                                        [{ prim: 'bytes', annots: ['%block_hash'] },
                                                          { prim: 'nat', annots: ['%log_index'] }],
                                                      annots: ['%event_id']
                                                    },
                                                      {
                                                        prim: 'pair',
                                                        args:
                                                          [{ prim: 'address', annots: ['%owner'] },
                                                            { prim: 'nat', annots: ['%token_id'] }]
                                                      }]
                                                }],
                                            annots: ['%mint_erc721']
                                          }]
                                    }],
                                annots: ['%entrypoint']
                              },
                                { prim: 'address', annots: ['%target'] }],
                            annots: ['%action']
                          },
                            {
                              prim: 'list',
                              args: [{ prim: 'pair', args: [{ prim: 'string' }, { prim: 'signature' }] }],
                              annots: ['%signatures']
                            }],
                        annots: ['%minter']
                      },
                        {
                          prim: 'pair',
                          args:
                            [{ prim: 'address', annots: ['%minter_contract'] },
                              {
                                prim: 'pair',
                                args:
                                  [{ prim: 'string', annots: ['%signer_id'] },
                                    { prim: 'signature', annots: ['%signature'] }]
                              }],
                          annots: ['%set_signer_payment_address']
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
                          [{ prim: 'address', annots: ['%admin'] },
                            {
                              prim: 'map',
                              args: [{ prim: 'string' }, { prim: 'nat' }],
                              annots: ['%counters']
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
                              { prim: 'option', args: [{ prim: 'address' }], annots: ['%pending_admin'] }]
                        }]
                  },
                    {
                      prim: 'pair',
                      args:
                        [{
                          prim: 'map',
                          args: [{ prim: 'string' }, { prim: 'key' }],
                          annots: ['%signers']
                        },
                          { prim: 'nat', annots: ['%threshold'] }]
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
                      [{
                        prim: 'pair',
                        args:
                          [{
                            prim: 'pair',
                            args:
                              [{ prim: 'address' },
                                { prim: 'map', args: [{ prim: 'string' }, { prim: 'nat' }] }]
                          },
                            {
                              prim: 'pair',
                              args:
                                [{ prim: 'big_map', args: [{ prim: 'string' }, { prim: 'bytes' }] },
                                  { prim: 'option', args: [{ prim: 'address' }] }]
                            }]
                      },
                        {
                          prim: 'pair',
                          args:
                            [{ prim: 'map', args: [{ prim: 'string' }, { prim: 'key' }] }, { prim: 'nat' }]
                        }]
                  },
                    { prim: 'unit' },
                    [{ prim: 'SENDER' },
                      { prim: 'SWAP' },
                      { prim: 'CAR' },
                      { prim: 'CAR' },
                      { prim: 'CAR' },
                      { prim: 'COMPARE' },
                      { prim: 'NEQ' },
                      {
                        prim: 'IF',
                        args:
                          [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'NOT_ADMIN' }] },
                            { prim: 'FAILWITH' }],
                            [{ prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] }]]
                      }]]
              },
                {
                  prim: 'LAMBDA',
                  args:
                    [{ prim: 'unit' },
                      { prim: 'unit' },
                      [{ prim: 'DROP' },
                        { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                        { prim: 'AMOUNT' },
                        { prim: 'COMPARE' },
                        { prim: 'GT' },
                        {
                          prim: 'IF',
                          args:
                            [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'FORBIDDEN_XTZ' }] },
                              { prim: 'FAILWITH' }],
                              [{ prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] }]]
                        }]]
                },
                {
                  prim: 'LAMBDA',
                  args:
                    [{ prim: 'address' },
                      {
                        prim: 'contract',
                        args:
                          [{
                            prim: 'or',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{ prim: 'list', args: [{ prim: 'key_hash' }] },
                                    {
                                      prim: 'list',
                                      args: [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                                    }]
                              },
                                { prim: 'list', args: [{ prim: 'key_hash' }] }]
                          }]
                      },
                      [{
                        prim: 'CONTRACT',
                        args:
                          [{
                            prim: 'or',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{ prim: 'list', args: [{ prim: 'key_hash' }], annots: ['%signers'] },
                                    {
                                      prim: 'list',
                                      args: [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }],
                                      annots: ['%tokens']
                                    }],
                                annots: ['%distribute_tokens']
                              },
                                { prim: 'list', args: [{ prim: 'key_hash' }], annots: ['%distribute_xtz'] }]
                          }],
                        annots: ['%oracle']
                      },
                        {
                          prim: 'IF_NONE',
                          args:
                            [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'BAD_CONTRACT_TARGET' }] },
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
                        [{
                          prim: 'pair',
                          args:
                            [{
                              prim: 'pair',
                              args:
                                [{ prim: 'address' },
                                  { prim: 'map', args: [{ prim: 'string' }, { prim: 'nat' }] }]
                            },
                              {
                                prim: 'pair',
                                args:
                                  [{ prim: 'big_map', args: [{ prim: 'string' }, { prim: 'bytes' }] },
                                    { prim: 'option', args: [{ prim: 'address' }] }]
                              }]
                        },
                          {
                            prim: 'pair',
                            args:
                              [{ prim: 'map', args: [{ prim: 'string' }, { prim: 'key' }] }, { prim: 'nat' }]
                          }]
                    },
                      { prim: 'list', args: [{ prim: 'key_hash' }] },
                      [{ prim: 'NIL', args: [{ prim: 'key_hash' }] },
                        { prim: 'SWAP' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        {
                          prim: 'ITER',
                          args: [[{ prim: 'CDR' }, { prim: 'HASH_KEY' }, { prim: 'CONS' }]]
                        }]]
                },
                { prim: 'DIG', args: [{ int: '4' }] },
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
                          { prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
                          { prim: 'DIG', args: [{ int: '3' }] },
                          { prim: 'SWAP' },
                          { prim: 'EXEC' },
                          { prim: 'DROP' },
                          {
                            prim: 'IF_LEFT',
                            args:
                              [[{
                                prim: 'IF_LEFT',
                                args:
                                  [[{ prim: 'SWAP' },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '2' }] },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'EXEC' },
                                    { prim: 'DROP' },
                                    { prim: 'DUP' },
                                    { prim: 'UNPAIR' },
                                    { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '2' }] },
                                    { prim: 'COMPARE' },
                                    { prim: 'LT' },
                                    { prim: 'DUP', args: [{ int: '3' }] },
                                    { prim: 'SIZE' },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'COMPARE' },
                                    { prim: 'GT' },
                                    { prim: 'OR' },
                                    {
                                      prim: 'IF',
                                      args:
                                        [[{ prim: 'DROP' },
                                          { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'BAD_QUORUM' }] },
                                          { prim: 'FAILWITH' }],
                                          [{ prim: 'EMPTY_SET', args: [{ prim: 'key_hash' }] },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            {
                                              prim: 'ITER',
                                              args:
                                                [[{ prim: 'CDR' },
                                                  { prim: 'HASH_KEY' },
                                                  { prim: 'PUSH', args: [{ prim: 'bool' }, { prim: 'True' }] },
                                                  { prim: 'SWAP' },
                                                  { prim: 'UPDATE' }]]
                                            },
                                            { prim: 'SWAP' },
                                            { prim: 'SIZE' },
                                            { prim: 'SWAP' },
                                            { prim: 'SIZE' },
                                            { prim: 'COMPARE' },
                                            { prim: 'NEQ' },
                                            {
                                              prim: 'IF',
                                              args:
                                                [[{
                                                  prim: 'PUSH',
                                                  args: [{ prim: 'string' }, { string: 'BAD_QUORUM' }]
                                                },
                                                  { prim: 'FAILWITH' }],
                                                  []]
                                            }]]
                                    },
                                    { prim: 'UNPAIR' },
                                    { prim: 'DUP', args: [{ int: '3' }] },
                                    { prim: 'CDR' },
                                    { prim: 'CAR' },
                                    { prim: 'PAIR' },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'CAR' },
                                    { prim: 'PAIR' },
                                    { prim: 'DUP' },
                                    { prim: 'CDR' },
                                    { prim: 'CDR' },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'PAIR' },
                                    { prim: 'SWAP' },
                                    { prim: 'CAR' },
                                    { prim: 'PAIR' }],
                                    [{ prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'EXEC' },
                                      { prim: 'DROP' },
                                      { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'COMPARE' },
                                      { prim: 'LT' },
                                      { prim: 'DUP', args: [{ int: '3' }] },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'SIZE' },
                                      { prim: 'DUP', args: [{ int: '3' }] },
                                      { prim: 'COMPARE' },
                                      { prim: 'GT' },
                                      { prim: 'OR' },
                                      {
                                        prim: 'IF',
                                        args:
                                          [[{ prim: 'DROP', args: [{ int: '2' }] },
                                            { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'BAD_QUORUM' }] },
                                            { prim: 'FAILWITH' }],
                                            [{ prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'CDR' },
                                              { prim: 'CAR' },
                                              { prim: 'PAIR' },
                                              { prim: 'SWAP' },
                                              { prim: 'CAR' },
                                              { prim: 'PAIR' }]]
                                      }]]
                              }],
                                [{
                                  prim: 'IF_LEFT',
                                  args:
                                    [[{ prim: 'DROP' },
                                      { prim: 'SWAP' },
                                      { prim: 'DROP' },
                                      { prim: 'DUP' },
                                      { prim: 'CAR' },
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
                                              { prim: 'SWAP' },
                                              { prim: 'COMPARE' },
                                              { prim: 'EQ' },
                                              {
                                                prim: 'IF',
                                                args:
                                                  [[{ prim: 'DUP' },
                                                    { prim: 'CDR' },
                                                    { prim: 'NONE', args: [{ prim: 'address' }] },
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
                                                    { prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'CAR' },
                                                    { prim: 'CDR' },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'CAR' },
                                                    { prim: 'CAR' },
                                                    { prim: 'CDR' },
                                                    { prim: 'SENDER' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'PAIR' }],
                                                    [{ prim: 'DROP' },
                                                      {
                                                        prim: 'PUSH',
                                                        args: [{ prim: 'string' }, { string: 'NOT_A_PENDING_ADMIN' }]
                                                      },
                                                      { prim: 'FAILWITH' }]]
                                              }]]
                                      }],
                                      [{ prim: 'SWAP' },
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
                                        { prim: 'SWAP' },
                                        { prim: 'SOME' },
                                        { prim: 'DUP', args: [{ int: '3' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'PAIR' },
                                        { prim: 'PAIR' }]]
                                }]]
                          },
                          { prim: 'NIL', args: [{ prim: 'operation' }] },
                          { prim: 'PAIR' }],
                          [{ prim: 'DIG', args: [{ int: '5' }] },
                            { prim: 'DROP' },
                            { prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
                            { prim: 'DIG', args: [{ int: '5' }] },
                            { prim: 'SWAP' },
                            { prim: 'EXEC' },
                            { prim: 'DROP' },
                            {
                              prim: 'IF_LEFT',
                              args:
                                [[{ prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CAR' },
                                  { prim: 'DIG', args: [{ int: '4' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'LEFT', args: [{ prim: 'list', args: [{ prim: 'key_hash' }] }] },
                                  { prim: 'TRANSFER_TOKENS' },
                                  { prim: 'SWAP' },
                                  { prim: 'NIL', args: [{ prim: 'operation' }] },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'CONS' },
                                  { prim: 'PAIR' }],
                                  [{ prim: 'SWAP' },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '2' }] },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'EXEC' },
                                    { prim: 'SWAP' },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'EXEC' },
                                    { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    {
                                      prim: 'RIGHT',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'list', args: [{ prim: 'key_hash' }] },
                                              {
                                                prim: 'list',
                                                args: [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                                              }]
                                        }]
                                    },
                                    { prim: 'TRANSFER_TOKENS' },
                                    { prim: 'SWAP' },
                                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'CONS' },
                                    { prim: 'PAIR' }]]
                            }]]
                    }],
                      [{ prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'DROP' },
                        { prim: 'DIG', args: [{ int: '2' }] },
                        { prim: 'DROP' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'DROP' },
                        {
                          prim: 'IF_LEFT',
                          args:
                            [[{ prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'DROP' },
                              { prim: 'SWAP' },
                              { prim: 'DUP' },
                              { prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'SWAP' },
                              { prim: 'DUP' },
                              { prim: 'DUG', args: [{ int: '2' }] },
                              { prim: 'CDR' },
                              { prim: 'CDR' },
                              { prim: 'SWAP' },
                              { prim: 'DUP' },
                              { prim: 'DUG', args: [{ int: '2' }] },
                              { prim: 'CDR' },
                              { prim: 'SIZE' },
                              { prim: 'COMPARE' },
                              { prim: 'LT' },
                              {
                                prim: 'IF',
                                args:
                                  [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'MISSING_SIGNATURES' }] },
                                    { prim: 'FAILWITH' }],
                                    []]
                              },
                              { prim: 'DUP' },
                              { prim: 'CAR' },
                              { prim: 'SELF_ADDRESS' },
                              { prim: 'CHAIN_ID' },
                              { prim: 'PAIR' },
                              { prim: 'PAIR' },
                              { prim: 'DUP', args: [{ int: '3' }] },
                              { prim: 'CDR' },
                              { prim: 'CAR' },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'CDR' },
                              { prim: 'CDR' },
                              { prim: 'PAIR' },
                              { prim: 'DUP', args: [{ int: '3' }] },
                              { prim: 'CDR' },
                              { prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'PACK' },
                              { prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'UNPAIR' },
                              { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                              { prim: 'DIG', args: [{ int: '4' }] },
                              {
                                prim: 'ITER',
                                args:
                                  [[{ prim: 'UNPAIR' },
                                    { prim: 'DUP', args: [{ int: '5' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'GET' },
                                    {
                                      prim: 'IF_NONE',
                                      args:
                                        [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'SIGNER_UNKNOWN' }] },
                                          { prim: 'FAILWITH' }],
                                          []]
                                    },
                                    { prim: 'DUP', args: [{ int: '6' }] },
                                    { prim: 'DUG', args: [{ int: '2' }] },
                                    { prim: 'CHECK_SIGNATURE' },
                                    {
                                      prim: 'IF',
                                      args:
                                        [[{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1' }] }, { prim: 'ADD' }],
                                          []]
                                    }]]
                              },
                              { prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'DROP' },
                              { prim: 'DIG', args: [{ int: '2' }] },
                              { prim: 'DROP' },
                              { prim: 'COMPARE' },
                              { prim: 'LT' },
                              {
                                prim: 'IF',
                                args:
                                  [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'BAD_SIGNATURE' }] },
                                    { prim: 'FAILWITH' }],
                                    []]
                              },
                              { prim: 'CAR' },
                              { prim: 'DUP' },
                              { prim: 'CDR' },
                              {
                                prim: 'CONTRACT',
                                args:
                                  [{
                                    prim: 'or',
                                    args:
                                      [{
                                        prim: 'or',
                                        args:
                                          [{
                                            prim: 'pair',
                                            args:
                                              [{ prim: 'bytes', annots: ['%eth_contract'] },
                                                {
                                                  prim: 'pair',
                                                  args: [{ prim: 'address' }, { prim: 'nat' }],
                                                  annots: ['%token_address']
                                                }],
                                            annots: ['%add_erc20']
                                          },
                                            {
                                              prim: 'pair',
                                              args:
                                                [{ prim: 'bytes', annots: ['%eth_contract'] },
                                                  { prim: 'address', annots: ['%token_contract'] }],
                                              annots: ['%add_erc721']
                                            }]
                                      },
                                        {
                                          prim: 'or',
                                          args:
                                            [{
                                              prim: 'pair',
                                              args:
                                                [{ prim: 'bytes', annots: ['%erc_20'] },
                                                  {
                                                    prim: 'pair',
                                                    args:
                                                      [{
                                                        prim: 'pair',
                                                        args:
                                                          [{ prim: 'bytes', annots: ['%block_hash'] },
                                                            { prim: 'nat', annots: ['%log_index'] }],
                                                        annots: ['%event_id']
                                                      },
                                                        {
                                                          prim: 'pair',
                                                          args:
                                                            [{ prim: 'address', annots: ['%owner'] },
                                                              { prim: 'nat', annots: ['%amount'] }]
                                                        }]
                                                  }],
                                              annots: ['%mint_erc20']
                                            },
                                              {
                                                prim: 'pair',
                                                args:
                                                  [{ prim: 'bytes', annots: ['%erc_721'] },
                                                    {
                                                      prim: 'pair',
                                                      args:
                                                        [{
                                                          prim: 'pair',
                                                          args:
                                                            [{ prim: 'bytes', annots: ['%block_hash'] },
                                                              { prim: 'nat', annots: ['%log_index'] }],
                                                          annots: ['%event_id']
                                                        },
                                                          {
                                                            prim: 'pair',
                                                            args:
                                                              [{ prim: 'address', annots: ['%owner'] },
                                                                { prim: 'nat', annots: ['%token_id'] }]
                                                          }]
                                                    }],
                                                annots: ['%mint_erc721']
                                              }]
                                        }]
                                  }],
                                annots: ['%signer']
                              },
                              {
                                prim: 'IF_NONE',
                                args:
                                  [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'BAD_CONTRACT_TARGET' }] },
                                    { prim: 'FAILWITH' }],
                                    []]
                              },
                              { prim: 'NIL', args: [{ prim: 'operation' }] },
                              { prim: 'SWAP' },
                              { prim: 'AMOUNT' },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'CAR' },
                              { prim: 'TRANSFER_TOKENS' },
                              { prim: 'CONS' },
                              { prim: 'PAIR' }],
                              [{ prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'DROP' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'GET' },
                                {
                                  prim: 'IF_NONE',
                                  args:
                                    [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'UNKNOWN_SIGNER' }] },
                                      { prim: 'FAILWITH' }],
                                      []]
                                },
                                { prim: 'DUP', args: [{ int: '3' }] },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'DUP', args: [{ int: '3' }] },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'GET' },
                                {
                                  prim: 'IF_NONE',
                                  args: [[{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] }], []]
                                },
                                { prim: 'SENDER' },
                                { prim: 'DUP', args: [{ int: '4' }] },
                                { prim: 'CAR' },
                                { prim: 'PAIR' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'PAIR' },
                                { prim: 'SELF_ADDRESS' },
                                { prim: 'CHAIN_ID' },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'PACK' },
                                { prim: 'DUP', args: [{ int: '4' }] },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'DUP', args: [{ int: '4' }] },
                                { prim: 'CHECK_SIGNATURE' },
                                { prim: 'NOT' },
                                {
                                  prim: 'IF',
                                  args:
                                    [[{ prim: 'DROP', args: [{ int: '4' }] },
                                      { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'BAD_SIGNATURE' }] },
                                      { prim: 'FAILWITH' }],
                                      [{ prim: 'DUP', args: [{ int: '3' }] },
                                        { prim: 'CAR' },
                                        {
                                          prim: 'CONTRACT',
                                          args:
                                            [{
                                              prim: 'pair',
                                              args:
                                                [{ prim: 'key_hash', annots: ['%signer'] },
                                                  { prim: 'address', annots: ['%payment_address'] }]
                                            }],
                                          annots: ['%signer_ops']
                                        },
                                        {
                                          prim: 'IF_NONE',
                                          args:
                                            [[{
                                              prim: 'PUSH',
                                              args: [{ prim: 'string' }, { string: 'BAD_CONTRACT_TARGET' }]
                                            },
                                              { prim: 'FAILWITH' }],
                                              []]
                                        },
                                        { prim: 'SENDER' },
                                        { prim: 'DIG', args: [{ int: '3' }] },
                                        { prim: 'HASH_KEY' },
                                        { prim: 'PAIR' },
                                        { prim: 'SWAP' },
                                        { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'TRANSFER_TOKENS' },
                                        { prim: 'DUP', args: [{ int: '4' }] },
                                        { prim: 'CDR' },
                                        { prim: 'DUP', args: [{ int: '5' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'DUP', args: [{ int: '6' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1' }] },
                                        { prim: 'DIG', args: [{ int: '5' }] },
                                        { prim: 'ADD' },
                                        { prim: 'SOME' },
                                        { prim: 'DIG', args: [{ int: '5' }] },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'UPDATE' },
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
                                }]]
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
                    [{ bytes: '01b1f2a806608e615074cce263acd83220ba9b83f700' },
                      [{
                        prim: 'Elt',
                        args:
                          [{ string: 'k51qzi5uqu5dh0ijytcaqf92nqw2eqr6cx6ijo3bd95rj3v480o028gnzmhi68' },
                            { int: '1' }]
                      },
                        {
                          prim: 'Elt',
                          args:
                            [{ string: 'k51qzi5uqu5dhnlp2qgtxtmteby9mxa9jbau00jdiffsy336e0i6n8i5m4yu9p' },
                              { int: '2' }]
                        },
                        {
                          prim: 'Elt',
                          args:
                            [{ string: 'k51qzi5uqu5di3vfq4zyymf9lb9jmoq59qvpk1rpozndh3vxgtl7bfs818woze' },
                              { int: '1' }]
                        },
                        {
                          prim: 'Elt',
                          args:
                            [{ string: 'k51qzi5uqu5dj81z6oy5lyg55ztw6a1nrkfqz8xhm7u3orw5shilst6i8y6761' },
                              { int: '1' }]
                        },
                        {
                          prim: 'Elt',
                          args:
                            [{ string: 'k51qzi5uqu5dl0xb0l5xts69xhzeko2regg22ixa8yua9kgq1lzeggmv7uwbe7' },
                              { int: '1' }]
                        }]]
                },
                  { prim: 'Pair', args: [{ int: '1781' }, { prim: 'None' }] }]
            },
              {
                prim: 'Pair',
                args:
                  [[{
                    prim: 'Elt',
                    args:
                      [{ string: 'k51qzi5uqu5dh0ijytcaqf92nqw2eqr6cx6ijo3bd95rj3v480o028gnzmhi68' },
                        { bytes: '01038bb1ef32285dab3be4dee8975020bf56fa4bbec5cb45b77c7c43c1fb1e02de4a' }]
                  },
                    {
                      prim: 'Elt',
                      args:
                        [{ string: 'k51qzi5uqu5dhnlp2qgtxtmteby9mxa9jbau00jdiffsy336e0i6n8i5m4yu9p' },
                          { bytes: '010257c0b46ef605466d9fdc0d16df76a5cfde7a7d82122322de1c8a09e4724e9b12' }]
                    },
                    {
                      prim: 'Elt',
                      args:
                        [{ string: 'k51qzi5uqu5di3vfq4zyymf9lb9jmoq59qvpk1rpozndh3vxgtl7bfs818woze' },
                          { bytes: '00dd55728312390406c77eb925bdb2a89202877a796447e1b7bd0920e72d89a2c8' }]
                    },
                    {
                      prim: 'Elt',
                      args:
                        [{ string: 'k51qzi5uqu5dj81z6oy5lyg55ztw6a1nrkfqz8xhm7u3orw5shilst6i8y6761' },
                          { bytes: '010313a35eedd6605bcdb6a48435af6545a7a6c75c26f99b6edb677b77f4fac4252d' }]
                    },
                    {
                      prim: 'Elt',
                      args:
                        [{ string: 'k51qzi5uqu5dl0xb0l5xts69xhzeko2regg22ixa8yua9kgq1lzeggmv7uwbe7' },
                          { bytes: '0102cdaa27b52091d3ed0036f47afebafce432c19b860daf22f4bb41f29653e08672' }]
                    }],
                    { int: '3' }]
              }]
        }
    },
  entrypoints:
    {
      entrypoints:
        {
          set_signer_payment_address:
            {
              prim: 'pair',
              args:
                [{ prim: 'address', annots: ['%minter_contract'] },
                  { prim: 'string', annots: ['%signer_id'] },
                  { prim: 'signature', annots: ['%signature'] }]
            },
          set_admin: { prim: 'address' },
          minter:
            {
              prim: 'pair',
              args:
                [{
                  prim: 'pair',
                  args:
                    [{
                      prim: 'or',
                      args:
                        [{
                          prim: 'or',
                          args:
                            [{
                              prim: 'pair',
                              args:
                                [{ prim: 'bytes', annots: ['%eth_contract'] },
                                  {
                                    prim: 'pair',
                                    args: [{ prim: 'address' }, { prim: 'nat' }],
                                    annots: ['%token_address']
                                  }],
                              annots: ['%add_erc20']
                            },
                              {
                                prim: 'pair',
                                args:
                                  [{ prim: 'bytes', annots: ['%eth_contract'] },
                                    { prim: 'address', annots: ['%token_contract'] }],
                                annots: ['%add_erc721']
                              }]
                        },
                          {
                            prim: 'or',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{ prim: 'bytes', annots: ['%erc_20'] },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{ prim: 'bytes', annots: ['%block_hash'] },
                                          { prim: 'nat', annots: ['%log_index'] }],
                                      annots: ['%event_id']
                                    },
                                    { prim: 'address', annots: ['%owner'] },
                                    { prim: 'nat', annots: ['%amount'] }],
                                annots: ['%mint_erc20']
                              },
                                {
                                  prim: 'pair',
                                  args:
                                    [{ prim: 'bytes', annots: ['%erc_721'] },
                                      {
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'bytes', annots: ['%block_hash'] },
                                            { prim: 'nat', annots: ['%log_index'] }],
                                        annots: ['%event_id']
                                      },
                                      { prim: 'address', annots: ['%owner'] },
                                      { prim: 'nat', annots: ['%token_id'] }],
                                  annots: ['%mint_erc721']
                                }]
                          }],
                      annots: ['%entrypoint']
                    },
                      { prim: 'address', annots: ['%target'] }],
                  annots: ['%action']
                },
                  {
                    prim: 'list',
                    args: [{ prim: 'pair', args: [{ prim: 'string' }, { prim: 'signature' }] }],
                    annots: ['%signatures']
                  }]
            },
          fees:
            {
              prim: 'or',
              args:
                [{
                  prim: 'pair',
                  args:
                    [{ prim: 'address', annots: ['%minter_contract'] },
                      {
                        prim: 'list',
                        args: [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }],
                        annots: ['%tokens']
                      }],
                  annots: ['%distribute_tokens_with_quorum']
                },
                  { prim: 'address', annots: ['%distribute_xtz_with_quorum'] }]
            },
          distribute_xtz_with_quorum: { prim: 'address' },
          distribute_tokens_with_quorum:
            {
              prim: 'pair',
              args:
                [{ prim: 'address', annots: ['%minter_contract'] },
                  {
                    prim: 'list',
                    args: [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }],
                    annots: ['%tokens']
                  }]
            },
          confirm_admin: { prim: 'unit' },
          change_threshold: { prim: 'nat' },
          change_quorum:
            {
              prim: 'pair',
              args:
                [{ prim: 'nat' }, { prim: 'map', args: [{ prim: 'string' }, { prim: 'key' }] }]
            },
          admin:
            {
              prim: 'or',
              args:
                [{
                  prim: 'or',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'nat' }, { prim: 'map', args: [{ prim: 'string' }, { prim: 'key' }] }],
                      annots: ['%change_quorum']
                    },
                      { prim: 'nat', annots: ['%change_threshold'] }]
                },
                  {
                    prim: 'or',
                    args:
                      [{ prim: 'unit', annots: ['%confirm_admin'] },
                        { prim: 'address', annots: ['%set_admin'] }]
                  }]
            }
        }
    }
};