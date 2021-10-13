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
                              prim: 'or',
                              args:
                                [{
                                  prim: 'or',
                                  args:
                                    [{ prim: 'unit', annots: ['%confirm_minter_admin'] },
                                      { prim: 'bool', annots: ['%pause_contract'] }]
                                },
                                  {
                                    prim: 'or',
                                    args:
                                      [{ prim: 'address', annots: ['%set_administrator'] },
                                        { prim: 'address', annots: ['%set_oracle'] }]
                                  }]
                            },
                              { prim: 'address', annots: ['%set_signer'] }],
                          annots: ['%contract_admin']
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
                                      [{ prim: 'address', annots: ['%fa2'] },
                                        { prim: 'list', args: [{ prim: 'nat' }], annots: ['%tokens'] }],
                                    annots: ['%withdraw_all_tokens']
                                  },
                                    { prim: 'unit', annots: ['%withdraw_all_xtz'] }]
                              },
                                {
                                  prim: 'or',
                                  args:
                                    [{
                                      prim: 'pair',
                                      args:
                                        [{ prim: 'address', annots: ['%fa2'] },
                                          {
                                            prim: 'pair',
                                            args:
                                              [{ prim: 'nat', annots: ['%token_id'] }, {
                                                prim: 'nat',
                                                annots: ['%amount']
                                              }]
                                          }],
                                      annots: ['%withdraw_token']
                                    },
                                      { prim: 'mutez', annots: ['%withdraw_xtz'] }]
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
                              [{
                                prim: 'or',
                                args:
                                  [{
                                    prim: 'or',
                                    args:
                                      [{ prim: 'address', annots: ['%set_dev_pool'] },
                                        { prim: 'nat', annots: ['%set_erc20_unwrapping_fees'] }]
                                  },
                                    {
                                      prim: 'or',
                                      args:
                                        [{ prim: 'nat', annots: ['%set_erc20_wrapping_fees'] },
                                          { prim: 'mutez', annots: ['%set_erc721_unwrapping_fees'] }]
                                    }]
                              },
                                {
                                  prim: 'or',
                                  args:
                                    [{
                                      prim: 'or',
                                      args:
                                        [{ prim: 'mutez', annots: ['%set_erc721_wrapping_fees'] },
                                          {
                                            prim: 'pair',
                                            args:
                                              [{ prim: 'nat', annots: ['%dev_pool'] },
                                                {
                                                  prim: 'pair',
                                                  args:
                                                    [{ prim: 'nat', annots: ['%signers'] }, {
                                                      prim: 'nat',
                                                      annots: ['%staking']
                                                    }]
                                                }],
                                            annots: ['%set_fees_share']
                                          }]
                                    },
                                      {
                                        prim: 'or',
                                        args:
                                          [{ prim: 'address', annots: ['%set_governance'] },
                                            { prim: 'address', annots: ['%set_staking'] }]
                                      }]
                                }],
                            annots: ['%governance']
                          },
                            {
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
                                  { prim: 'list', args: [{ prim: 'key_hash' }], annots: ['%distribute_xtz'] }],
                              annots: ['%oracle']
                            }]
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
                            annots: ['%signer']
                          },
                            {
                              prim: 'pair',
                              args:
                                [{ prim: 'key_hash', annots: ['%signer'] },
                                  { prim: 'address', annots: ['%payment_address'] }],
                              annots: ['%signer_ops']
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
                                      [{ prim: 'nat', annots: ['%amount'] },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'nat', annots: ['%fees'] },
                                              { prim: 'bytes', annots: ['%destination'] }]
                                        }]
                                  }],
                              annots: ['%unwrap_erc20']
                            },
                              {
                                prim: 'pair',
                                args:
                                  [{ prim: 'bytes', annots: ['%erc_721'] },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{ prim: 'nat', annots: ['%token_id'] },
                                          { prim: 'bytes', annots: ['%destination'] }]
                                    }],
                                annots: ['%unwrap_erc721']
                              }],
                          annots: ['%unwrap']
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
                              [{
                                prim: 'pair',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'address', annots: ['%administrator'] },
                                        { prim: 'address', annots: ['%oracle'] }]
                                  },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{ prim: 'bool', annots: ['%paused'] },
                                          { prim: 'option', args: [{ prim: 'address' }], annots: ['%pending_admin'] }]
                                    }]
                              },
                                { prim: 'address', annots: ['%signer'] }],
                            annots: ['%admin']
                          },
                            {
                              prim: 'pair',
                              args:
                                [{
                                  prim: 'pair',
                                  args:
                                    [{
                                      prim: 'map',
                                      args:
                                        [{ prim: 'bytes' },
                                          { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }],
                                      annots: ['%erc20_tokens']
                                    },
                                      {
                                        prim: 'map',
                                        args: [{ prim: 'bytes' }, { prim: 'address' }],
                                        annots: ['%erc721_tokens']
                                      }]
                                },
                                  {
                                    prim: 'big_map',
                                    args:
                                      [{
                                        prim: 'pair',
                                        args:
                                          [{ prim: 'bytes', annots: ['%block_hash'] },
                                            { prim: 'nat', annots: ['%log_index'] }]
                                      },
                                        { prim: 'unit' }],
                                    annots: ['%mints']
                                  }],
                              annots: ['%assets']
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
                                      prim: 'map',
                                      args: [{ prim: 'key_hash' }, { prim: 'address' }],
                                      annots: ['%signers']
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
                                            { prim: 'nat' }],
                                        annots: ['%tokens']
                                      }]
                                },
                                  {
                                    prim: 'big_map',
                                    args: [{ prim: 'address' }, { prim: 'mutez' }],
                                    annots: ['%xtz']
                                  }],
                              annots: ['%fees']
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
                                          [{ prim: 'address', annots: ['%contract'] },
                                            { prim: 'address', annots: ['%dev_pool'] }]
                                      },
                                        {
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'nat', annots: ['%erc20_unwrapping_fees'] },
                                              { prim: 'nat', annots: ['%erc20_wrapping_fees'] }]
                                        }]
                                  },
                                    {
                                      prim: 'pair',
                                      args:
                                        [{
                                          prim: 'pair',
                                          args:
                                            [{ prim: 'mutez', annots: ['%erc721_unwrapping_fees'] },
                                              { prim: 'mutez', annots: ['%erc721_wrapping_fees'] }]
                                        },
                                          {
                                            prim: 'pair',
                                            args:
                                              [{
                                                prim: 'pair',
                                                args:
                                                  [{ prim: 'nat', annots: ['%dev_pool'] },
                                                    {
                                                      prim: 'pair',
                                                      args:
                                                        [{ prim: 'nat', annots: ['%signers'] }, {
                                                          prim: 'nat',
                                                          annots: ['%staking']
                                                        }]
                                                    }],
                                                annots: ['%fees_share']
                                              },
                                                { prim: 'address', annots: ['%staking'] }]
                                          }]
                                    }],
                                annots: ['%governance']
                              }]
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
              [[{
                prim: 'LAMBDA',
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
                        { prim: 'address' }]
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
                          { prim: 'address' }]
                    },
                      { prim: 'unit' },
                      [{ prim: 'SENDER' },
                        { prim: 'SWAP' },
                        { prim: 'CDR' },
                        { prim: 'COMPARE' },
                        { prim: 'NEQ' },
                        {
                          prim: 'IF',
                          args:
                            [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'NOT_SIGNER' }] },
                              { prim: 'FAILWITH' }],
                              [{ prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] }]]
                        }]]
                },
                {
                  prim: 'LAMBDA',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'bytes' },
                          {
                            prim: 'map',
                            args:
                              [{ prim: 'bytes' },
                                { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                          }]
                    },
                      { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] },
                      [{ prim: 'UNPAIR' },
                        { prim: 'GET' },
                        {
                          prim: 'IF_NONE',
                          args:
                            [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'UNKNOWN_TOKEN' }] },
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
                        [{ prim: 'bytes' },
                          { prim: 'map', args: [{ prim: 'bytes' }, { prim: 'address' }] }]
                    },
                      { prim: 'address' },
                      [{ prim: 'UNPAIR' },
                        { prim: 'GET' },
                        {
                          prim: 'IF_NONE',
                          args:
                            [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'UNKNOWN_TOKEN' }] },
                              { prim: 'FAILWITH' }],
                              []]
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
                            prim: 'list',
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
                          }]
                      },
                      [{
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
                            [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'CANNOT CALLBACK FA2' }] },
                              { prim: 'FAILWITH' }],
                              []]
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
                                prim: 'list',
                                args:
                                  [{
                                    prim: 'pair',
                                    args:
                                      [{ prim: 'address' },
                                        { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                  }]
                              },
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
                      [{
                        prim: 'CONTRACT',
                        args:
                          [{
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
                                            [{ prim: 'nat', annots: ['%token_id'] }, {
                                              prim: 'nat',
                                              annots: ['%amount']
                                            }]
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
                                }]
                          }],
                        annots: ['%tokens']
                      },
                        {
                          prim: 'IF_NONE',
                          args:
                            [[{
                              prim: 'PUSH',
                              args: [{ prim: 'string' }, { string: 'CONTRACT_NOT_COMPATIBLE' }]
                            },
                              { prim: 'FAILWITH' }],
                              []]
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
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'pair', args: [{ prim: 'bytes' }, { prim: 'nat' }] },
                          {
                            prim: 'big_map',
                            args:
                              [{ prim: 'pair', args: [{ prim: 'bytes' }, { prim: 'nat' }] }, { prim: 'unit' }]
                          }]
                    },
                      { prim: 'unit' },
                      [{ prim: 'UNPAIR' },
                        { prim: 'GET' },
                        {
                          prim: 'IF_NONE',
                          args:
                            [[{ prim: 'UNIT' }],
                              [{ prim: 'DROP' },
                                { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'TX_ALREADY_MINTED' }] },
                                { prim: 'FAILWITH' }]]
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
                              prim: 'big_map',
                              args:
                                [{
                                  prim: 'pair',
                                  args:
                                    [{ prim: 'address' },
                                      { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                                },
                                  { prim: 'nat' }]
                            },
                              { prim: 'address' }]
                        },
                          { prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                    },
                      { prim: 'nat' },
                      [{ prim: 'UNPAIR' },
                        { prim: 'UNPAIR' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        { prim: 'PAIR' },
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
                        [{ prim: 'big_map', args: [{ prim: 'address' }, { prim: 'mutez' }] },
                          { prim: 'address' }]
                    },
                      { prim: 'mutez' },
                      [{ prim: 'UNPAIR' },
                        { prim: 'SWAP' },
                        { prim: 'GET' },
                        {
                          prim: 'IF_NONE',
                          args: [[{ prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] }], []]
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
                            [{
                              prim: 'pair',
                              args:
                                [{ prim: 'big_map', args: [{ prim: 'address' }, { prim: 'mutez' }] },
                                  { prim: 'address' }]
                            },
                              { prim: 'mutez' }]
                        },
                          {
                            prim: 'pair',
                            args:
                              [{ prim: 'option', args: [{ prim: 'mutez' }] },
                                { prim: 'big_map', args: [{ prim: 'address' }, { prim: 'mutez' }] }]
                          }]
                    },
                      {
                        prim: 'pair',
                        args:
                          [{ prim: 'list', args: [{ prim: 'operation' }] },
                            { prim: 'big_map', args: [{ prim: 'address' }, { prim: 'mutez' }] }]
                      },
                      [{ prim: 'UNPAIR' },
                        { prim: 'SWAP' },
                        { prim: 'UNPAIR' },
                        { prim: 'SENDER' },
                        { prim: 'DUP', args: [{ int: '3' }] },
                        { prim: 'PAIR' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'SWAP' },
                        { prim: 'EXEC' },
                        { prim: 'SWAP' },
                        {
                          prim: 'IF_NONE',
                          args:
                            [[{ prim: 'DUP' }],
                              [{ prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'COMPARE' },
                                { prim: 'GT' },
                                {
                                  prim: 'IF',
                                  args:
                                    [[{ prim: 'DROP' },
                                      { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'NOT_ENOUGH_XTZ' }] },
                                      { prim: 'FAILWITH' }],
                                      []]
                                }]]
                        },
                        { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                        { prim: 'DUP', args: [{ int: '3' }] },
                        { prim: 'COMPARE' },
                        { prim: 'EQ' },
                        {
                          prim: 'IF',
                          args:
                            [[{ prim: 'DROP', args: [{ int: '2' }] },
                              { prim: 'NIL', args: [{ prim: 'operation' }] },
                              { prim: 'PAIR' }],
                              [{ prim: 'DUP' },
                                { prim: 'SENDER' },
                                { prim: 'CONTRACT', args: [{ prim: 'unit' }] },
                                {
                                  prim: 'IF_NONE',
                                  args:
                                    [[{ prim: 'DROP' },
                                      { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'NOT_PAYABLE' }] },
                                      { prim: 'FAILWITH' }],
                                      [{ prim: 'SWAP' }, { prim: 'UNIT' }, { prim: 'TRANSFER_TOKENS' }]]
                                },
                                { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                                { prim: 'DUP', args: [{ int: '3' }] },
                                { prim: 'DUP', args: [{ int: '5' }] },
                                { prim: 'SUB' },
                                { prim: 'COMPARE' },
                                { prim: 'EQ' },
                                {
                                  prim: 'IF',
                                  args:
                                    [[{ prim: 'SWAP' },
                                      { prim: 'DROP' },
                                      { prim: 'SWAP' },
                                      { prim: 'DROP' },
                                      { prim: 'SWAP' },
                                      { prim: 'NONE', args: [{ prim: 'mutez' }] },
                                      { prim: 'SENDER' },
                                      { prim: 'UPDATE' }],
                                      [{ prim: 'DIG', args: [{ int: '3' }] },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'DIG', args: [{ int: '3' }] },
                                        { prim: 'SUB' },
                                        { prim: 'SOME' },
                                        { prim: 'SENDER' },
                                        { prim: 'UPDATE' }]]
                                },
                                { prim: 'NIL', args: [{ prim: 'operation' }] },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'CONS' },
                                { prim: 'PAIR' }]]
                        }]]
                },
                { prim: 'SWAP' },
                { prim: 'APPLY' },
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
                            [{ prim: 'address' },
                              {
                                prim: 'contract',
                                args:
                                  [{
                                    prim: 'list',
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
                                  }]
                              }]
                        },
                          {
                            prim: 'pair',
                            args:
                              [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
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
                      { prim: 'operation' },
                      [{ prim: 'UNPAIR' },
                        { prim: 'SWAP' },
                        { prim: 'UNPAIR' },
                        { prim: 'UNPAIR' },
                        { prim: 'SWAP' },
                        { prim: 'DIG', args: [{ int: '3' }] },
                        { prim: 'SWAP' },
                        { prim: 'EXEC' },
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
                        { prim: 'DIG', args: [{ int: '4' }] },
                        { prim: 'DIG', args: [{ int: '4' }] },
                        { prim: 'PAIR' },
                        { prim: 'CONS' },
                        { prim: 'TRANSFER_TOKENS' }]]
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
                            [{ prim: 'list', args: [{ prim: 'key_hash' }] },
                              { prim: 'map', args: [{ prim: 'key_hash' }, { prim: 'address' }] }]
                        },
                          {
                            prim: 'pair',
                            args:
                              [{
                                prim: 'pair',
                                args:
                                  [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                                    { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                              },
                                {
                                  prim: 'pair',
                                  args:
                                    [{ prim: 'pair', args: [{ prim: 'mutez' }, { prim: 'mutez' }] },
                                      {
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
                                            { prim: 'address' }]
                                      }]
                                }]
                          }]
                    },
                      {
                        prim: 'list',
                        args: [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                      },
                      [{ prim: 'UNPAIR' },
                        { prim: 'UNPAIR' },
                        {
                          prim: 'NIL',
                          args: [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }]
                        },
                        { prim: 'DUP', args: [{ int: '4' }] },
                        { prim: 'CDR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CDR' },
                        { prim: 'DUP', args: [{ int: '5' }] },
                        { prim: 'CDR' },
                        { prim: 'CDR' },
                        { prim: 'CDR' },
                        { prim: 'PAIR' },
                        { prim: 'CONS' },
                        { prim: 'DUP', args: [{ int: '4' }] },
                        { prim: 'CDR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'DUP', args: [{ int: '5' }] },
                        { prim: 'CAR' },
                        { prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'PAIR' },
                        { prim: 'CONS' },
                        { prim: 'SWAP' },
                        { prim: 'DUP' },
                        { prim: 'DUG', args: [{ int: '2' }] },
                        {
                          prim: 'ITER',
                          args:
                            [[{ prim: 'SWAP' },
                              { prim: 'DUP', args: [{ int: '3' }] },
                              { prim: 'SIZE' },
                              { prim: 'DUP', args: [{ int: '6' }] },
                              { prim: 'CDR' },
                              { prim: 'CDR' },
                              { prim: 'CAR' },
                              { prim: 'CDR' },
                              { prim: 'CAR' },
                              { prim: 'EDIV' },
                              {
                                prim: 'IF_NONE',
                                args:
                                  [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'DIV by 0' }] },
                                    { prim: 'FAILWITH' }],
                                    []]
                              },
                              { prim: 'CAR' },
                              { prim: 'DUP', args: [{ int: '5' }] },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'DUP' },
                              { prim: 'DUG', args: [{ int: '2' }] },
                              { prim: 'GET' },
                              {
                                prim: 'IF_NONE',
                                args:
                                  [[{ prim: 'IMPLICIT_ACCOUNT' }, { prim: 'ADDRESS' }],
                                    [{ prim: 'SWAP' }, { prim: 'DROP' }]]
                              },
                              { prim: 'PAIR' },
                              { prim: 'CONS' }]]
                        },
                        { prim: 'SWAP' },
                        { prim: 'DROP' },
                        { prim: 'SWAP' },
                        { prim: 'DROP' },
                        { prim: 'SWAP' },
                        { prim: 'DROP' }]]
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
                            [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
                              {
                                prim: 'pair',
                                args: [{ prim: 'bool' }, { prim: 'option', args: [{ prim: 'address' }] }]
                              }]
                        },
                          { prim: 'address' }]
                    },
                      { prim: 'unit' },
                      [{ prim: 'CAR' },
                        { prim: 'CDR' },
                        { prim: 'CAR' },
                        {
                          prim: 'IF',
                          args:
                            [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'CONTRACT_PAUSED' }] },
                              { prim: 'FAILWITH' }],
                              [{ prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] }]]
                        }]]
                },
                { prim: 'DIG', args: [{ int: '14' }] },
                { prim: 'UNPAIR' },
                {
                  prim: 'IF_LEFT',
                  args:
                    [[{ prim: 'DIG', args: [{ int: '2' }] },
                      { prim: 'DROP' },
                      { prim: 'DIG', args: [{ int: '7' }] },
                      { prim: 'DROP' },
                      { prim: 'DIG', args: [{ int: '8' }] },
                      { prim: 'DROP' },
                      { prim: 'DIG', args: [{ int: '8' }] },
                      { prim: 'DROP' },
                      { prim: 'DIG', args: [{ int: '8' }] },
                      { prim: 'DROP' },
                      { prim: 'DIG', args: [{ int: '8' }] },
                      { prim: 'DROP' },
                      { prim: 'DIG', args: [{ int: '8' }] },
                      { prim: 'DROP' },
                      {
                        prim: 'IF_LEFT',
                        args:
                          [[{ prim: 'DIG', args: [{ int: '2' }] },
                            { prim: 'DROP' },
                            { prim: 'DIG', args: [{ int: '4' }] },
                            { prim: 'DROP' },
                            {
                              prim: 'IF_LEFT',
                              args:
                                [[{ prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'DROP' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'DROP' },
                                  { prim: 'DIG', args: [{ int: '2' }] },
                                  { prim: 'DROP' },
                                  { prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
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
                                  { prim: 'SWAP' },
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
                                                { prim: 'DIG', args: [{ int: '2' }] },
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
                                                              { prim: 'PAIR' },
                                                              { prim: 'NIL', args: [{ prim: 'operation' }] },
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
                                                  { prim: 'DIG', args: [{ int: '4' }] },
                                                  { prim: 'SWAP' },
                                                  { prim: 'EXEC' },
                                                  { prim: 'DROP' },
                                                  { prim: 'SWAP' },
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
                                                  { prim: 'PAIR' },
                                                  { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                  { prim: 'PAIR' }]]
                                          }],
                                            [{
                                              prim: 'IF_LEFT',
                                              args:
                                                [[{ prim: 'SWAP' },
                                                  { prim: 'DUP' },
                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                  { prim: 'DIG', args: [{ int: '4' }] },
                                                  { prim: 'SWAP' },
                                                  { prim: 'EXEC' },
                                                  { prim: 'DROP' },
                                                  { prim: 'SWAP' },
                                                  { prim: 'DUP' },
                                                  { prim: 'CDR' },
                                                  { prim: 'DIG', args: [{ int: '2' }] },
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
                                                  { prim: 'PAIR' },
                                                  { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                  { prim: 'PAIR' }],
                                                  [{ prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'DIG', args: [{ int: '4' }] },
                                                    { prim: 'SWAP' },
                                                    { prim: 'EXEC' },
                                                    { prim: 'DROP' },
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
                                                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                    { prim: 'PAIR' }]]
                                            }]]
                                      }],
                                        [{ prim: 'SWAP' },
                                          { prim: 'DUP' },
                                          { prim: 'DUG', args: [{ int: '2' }] },
                                          { prim: 'DIG', args: [{ int: '4' }] },
                                          { prim: 'SWAP' },
                                          { prim: 'EXEC' },
                                          { prim: 'DROP' },
                                          { prim: 'SWAP' },
                                          { prim: 'CAR' },
                                          { prim: 'PAIR' },
                                          { prim: 'NIL', args: [{ prim: 'operation' }] },
                                          { prim: 'PAIR' }]]
                                  },
                                  { prim: 'UNPAIR' },
                                  { prim: 'DUP', args: [{ int: '3' }] },
                                  { prim: 'CDR' },
                                  { prim: 'DUP', args: [{ int: '4' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '4' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CDR' },
                                  { prim: 'DIG', args: [{ int: '4' }] },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'PAIR' },
                                  { prim: 'SWAP' },
                                  { prim: 'PAIR' }],
                                  [{ prim: 'DIG', args: [{ int: '6' }] },
                                    { prim: 'DROP' },
                                    { prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
                                    { prim: 'DIG', args: [{ int: '6' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'EXEC' },
                                    { prim: 'DROP' },
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
                                              { prim: 'CDR' },
                                              { prim: 'CAR' },
                                              { prim: 'CAR' },
                                              { prim: 'CDR' },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
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
                                              { prim: 'PAIR' },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'CDR' },
                                              {
                                                prim: 'ITER',
                                                args:
                                                  [[{ prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'UNPAIR' },
                                                    { prim: 'DUP', args: [{ int: '4' }] },
                                                    { prim: 'DUP', args: [{ int: '6' }] },
                                                    { prim: 'CAR' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'DUP' },
                                                    { prim: 'SENDER' },
                                                    { prim: 'DUP', args: [{ int: '9' }] },
                                                    { prim: 'PAIR' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'DUP', args: [{ int: '12' }] },
                                                    { prim: 'SWAP' },
                                                    { prim: 'EXEC' },
                                                    { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'COMPARE' },
                                                    { prim: 'EQ' },
                                                    {
                                                      prim: 'IF',
                                                      args:
                                                        [[{
                                                          prim: 'DROP',
                                                          args: [{ int: '4' }]
                                                        }, { prim: 'SWAP' }, { prim: 'DROP' }],
                                                          [{ prim: 'DIG', args: [{ int: '4' }] },
                                                            { prim: 'DROP' },
                                                            { prim: 'DIG', args: [{ int: '4' }] },
                                                            { prim: 'PAIR' },
                                                            { prim: 'SENDER' },
                                                            { prim: 'PAIR' },
                                                            { prim: 'DIG', args: [{ int: '3' }] },
                                                            { prim: 'DIG', args: [{ int: '2' }] },
                                                            { prim: 'SENDER' },
                                                            { prim: 'PAIR' },
                                                            { prim: 'NONE', args: [{ prim: 'nat' }] },
                                                            { prim: 'SWAP' },
                                                            { prim: 'UPDATE' },
                                                            { prim: 'DUG', args: [{ int: '2' }] },
                                                            { prim: 'CONS' },
                                                            { prim: 'PAIR' }]]
                                                    }]]
                                              },
                                              { prim: 'SWAP' },
                                              { prim: 'DROP' },
                                              { prim: 'SWAP' },
                                              { prim: 'DROP' },
                                              { prim: 'DIG', args: [{ int: '4' }] },
                                              { prim: 'DROP' },
                                              { prim: 'UNPAIR' },
                                              { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'SIZE' },
                                              { prim: 'COMPARE' },
                                              { prim: 'EQ' },
                                              {
                                                prim: 'IF',
                                                args:
                                                  [[{ prim: 'DROP' },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DROP' },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'DROP' },
                                                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                    { prim: 'PAIR' }],
                                                    [{ prim: 'DIG', args: [{ int: '2' }] },
                                                      { prim: 'CAR' },
                                                      { prim: 'SELF_ADDRESS' },
                                                      { prim: 'PAIR' },
                                                      { prim: 'PAIR' },
                                                      { prim: 'DIG', args: [{ int: '3' }] },
                                                      { prim: 'SWAP' },
                                                      { prim: 'EXEC' },
                                                      { prim: 'SWAP' },
                                                      { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                      { prim: 'DIG', args: [{ int: '2' }] },
                                                      { prim: 'CONS' },
                                                      { prim: 'PAIR' }]]
                                              },
                                              { prim: 'UNPAIR' },
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
                                              { prim: 'DUP', args: [{ int: '6' }] },
                                              { prim: 'CAR' },
                                              { prim: 'CDR' },
                                              { prim: 'CAR' },
                                              { prim: 'CAR' },
                                              { prim: 'CAR' },
                                              { prim: 'PAIR' },
                                              { prim: 'PAIR' },
                                              { prim: 'PAIR' },
                                              { prim: 'DIG', args: [{ int: '3' }] },
                                              { prim: 'CAR' },
                                              { prim: 'CAR' },
                                              { prim: 'PAIR' },
                                              { prim: 'PAIR' },
                                              { prim: 'SWAP' },
                                              { prim: 'PAIR' }],
                                              [{ prim: 'DROP' },
                                                { prim: 'SWAP' },
                                                { prim: 'DROP' },
                                                { prim: 'DIG', args: [{ int: '2' }] },
                                                { prim: 'DROP' },
                                                { prim: 'DUP' },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'NONE', args: [{ prim: 'mutez' }] },
                                                { prim: 'PAIR' },
                                                { prim: 'DIG', args: [{ int: '2' }] },
                                                { prim: 'SWAP' },
                                                { prim: 'EXEC' },
                                                { prim: 'UNPAIR' },
                                                { prim: 'DUP', args: [{ int: '3' }] },
                                                { prim: 'CDR' },
                                                { prim: 'DUP', args: [{ int: '4' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'CDR' },
                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'DUP', args: [{ int: '5' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
                                                { prim: 'PAIR' },
                                                { prim: 'PAIR' },
                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
                                                { prim: 'PAIR' },
                                                { prim: 'PAIR' },
                                                { prim: 'SWAP' },
                                                { prim: 'PAIR' }]]
                                        }],
                                          [{
                                            prim: 'IF_LEFT',
                                            args:
                                              [[{ prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'DROP' },
                                                { prim: 'SWAP' },
                                                { prim: 'DUP' },
                                                { prim: 'DUG', args: [{ int: '2' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'SWAP' },
                                                { prim: 'DUP' },
                                                { prim: 'CDR' },
                                                { prim: 'CAR' },
                                                { prim: 'SWAP' },
                                                { prim: 'DUP' },
                                                { prim: 'DUG', args: [{ int: '2' }] },
                                                { prim: 'CAR' },
                                                { prim: 'PAIR' },
                                                { prim: 'DUP' },
                                                { prim: 'SENDER' },
                                                { prim: 'DUP', args: [{ int: '5' }] },
                                                { prim: 'PAIR' },
                                                { prim: 'PAIR' },
                                                { prim: 'DIG', args: [{ int: '6' }] },
                                                { prim: 'SWAP' },
                                                { prim: 'EXEC' },
                                                { prim: 'DUP', args: [{ int: '3' }] },
                                                { prim: 'CDR' },
                                                { prim: 'CDR' },
                                                { prim: 'SWAP' },
                                                { prim: 'SUB' },
                                                { prim: 'ISNAT' },
                                                {
                                                  prim: 'IF_NONE',
                                                  args:
                                                    [[{
                                                      prim: 'PUSH',
                                                      args: [{ prim: 'string' }, { string: 'NOT_ENOUGH_BALANCE' }]
                                                    },
                                                      { prim: 'FAILWITH' }],
                                                      []]
                                                },
                                                { prim: 'DUP', args: [{ int: '3' }] },
                                                { prim: 'CDR' },
                                                { prim: 'CDR' },
                                                { prim: 'DUP', args: [{ int: '4' }] },
                                                { prim: 'CDR' },
                                                { prim: 'CAR' },
                                                { prim: 'PAIR' },
                                                { prim: 'SENDER' },
                                                { prim: 'PAIR' },
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
                                                { prim: 'SWAP' },
                                                { prim: 'CONS' },
                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'CAR' },
                                                { prim: 'SELF_ADDRESS' },
                                                { prim: 'PAIR' },
                                                { prim: 'PAIR' },
                                                { prim: 'DIG', args: [{ int: '5' }] },
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
                                                      { prim: 'DUG', args: [{ int: '2' }] },
                                                      { prim: 'SENDER' },
                                                      { prim: 'PAIR' },
                                                      { prim: 'NONE', args: [{ prim: 'nat' }] },
                                                      { prim: 'SWAP' },
                                                      { prim: 'UPDATE' }],
                                                      [{ prim: 'DIG', args: [{ int: '3' }] },
                                                        { prim: 'DIG', args: [{ int: '2' }] },
                                                        { prim: 'SOME' },
                                                        { prim: 'DIG', args: [{ int: '3' }] },
                                                        { prim: 'SENDER' },
                                                        { prim: 'PAIR' },
                                                        { prim: 'UPDATE' }]]
                                                },
                                                { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                { prim: 'DIG', args: [{ int: '2' }] },
                                                { prim: 'CONS' },
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
                                                { prim: 'DUP', args: [{ int: '6' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
                                                { prim: 'PAIR' },
                                                { prim: 'PAIR' },
                                                { prim: 'PAIR' },
                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
                                                { prim: 'PAIR' },
                                                { prim: 'PAIR' },
                                                { prim: 'SWAP' },
                                                { prim: 'PAIR' }],
                                                [{ prim: 'DIG', args: [{ int: '2' }] },
                                                  { prim: 'DROP' },
                                                  { prim: 'DIG', args: [{ int: '3' }] },
                                                  { prim: 'DROP' },
                                                  { prim: 'SWAP' },
                                                  { prim: 'DUP' },
                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'SWAP' },
                                                  { prim: 'SOME' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'DIG', args: [{ int: '2' }] },
                                                  { prim: 'SWAP' },
                                                  { prim: 'EXEC' },
                                                  { prim: 'UNPAIR' },
                                                  { prim: 'DUP', args: [{ int: '3' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'DUP', args: [{ int: '4' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'DIG', args: [{ int: '3' }] },
                                                  { prim: 'DUP', args: [{ int: '5' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'DIG', args: [{ int: '3' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'SWAP' },
                                                  { prim: 'PAIR' }]]
                                          }]]
                                    }]]
                            }],
                            [{ prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'DROP' },
                              { prim: 'DIG', args: [{ int: '3' }] },
                              { prim: 'DROP' },
                              { prim: 'DIG', args: [{ int: '6' }] },
                              { prim: 'DROP' },
                              {
                                prim: 'IF_LEFT',
                                args:
                                  [[{ prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'DROP' },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'DROP' },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'DROP' },
                                    { prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'EXEC' },
                                    { prim: 'DROP' },
                                    { prim: 'SENDER' },
                                    { prim: 'DUP', args: [{ int: '3' }] },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'CDR' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'COMPARE' },
                                    { prim: 'NEQ' },
                                    {
                                      prim: 'IF',
                                      args:
                                        [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'NOT_GOVERNANCE' }] },
                                          { prim: 'FAILWITH' }],
                                          []]
                                    },
                                    { prim: 'SWAP' },
                                    { prim: 'DUP' },
                                    { prim: 'DUG', args: [{ int: '2' }] },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'CDR' },
                                    { prim: 'SWAP' },
                                    {
                                      prim: 'IF_LEFT',
                                      args:
                                        [[{
                                          prim: 'IF_LEFT',
                                          args:
                                            [[{
                                              prim: 'IF_LEFT',
                                              args:
                                                [[{ prim: 'SWAP' },
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
                                                  { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                  { prim: 'PAIR' }],
                                                  [{ prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'DUP', args: [{ int: '3' }] },
                                                    { prim: 'CAR' },
                                                    { prim: 'CDR' },
                                                    { prim: 'CDR' },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'PAIR' },
                                                    { prim: 'DIG', args: [{ int: '2' }] },
                                                    { prim: 'CAR' },
                                                    { prim: 'CAR' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                    { prim: 'PAIR' }]]
                                            }],
                                              [{
                                                prim: 'IF_LEFT',
                                                args:
                                                  [[{ prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'SWAP' },
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
                                                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                    { prim: 'PAIR' }],
                                                    [{ prim: 'SWAP' },
                                                      { prim: 'DUP' },
                                                      { prim: 'DUG', args: [{ int: '2' }] },
                                                      { prim: 'CDR' },
                                                      { prim: 'CDR' },
                                                      { prim: 'DUP', args: [{ int: '3' }] },
                                                      { prim: 'CDR' },
                                                      { prim: 'CAR' },
                                                      { prim: 'CDR' },
                                                      { prim: 'DIG', args: [{ int: '2' }] },
                                                      { prim: 'PAIR' },
                                                      { prim: 'PAIR' },
                                                      { prim: 'SWAP' },
                                                      { prim: 'CAR' },
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
                                                  [[{ prim: 'SWAP' },
                                                    { prim: 'DUP' },
                                                    { prim: 'DUG', args: [{ int: '2' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'CDR' },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DUP', args: [{ int: '3' }] },
                                                    { prim: 'CDR' },
                                                    { prim: 'CAR' },
                                                    { prim: 'CAR' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'SWAP' },
                                                    { prim: 'CAR' },
                                                    { prim: 'PAIR' },
                                                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                    { prim: 'PAIR' }],
                                                    [{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '100' }] },
                                                      { prim: 'SWAP' },
                                                      { prim: 'DUP' },
                                                      { prim: 'DUG', args: [{ int: '2' }] },
                                                      { prim: 'CDR' },
                                                      { prim: 'CAR' },
                                                      { prim: 'DUP', args: [{ int: '3' }] },
                                                      { prim: 'CDR' },
                                                      { prim: 'CDR' },
                                                      { prim: 'DUP', args: [{ int: '4' }] },
                                                      { prim: 'CAR' },
                                                      { prim: 'ADD' },
                                                      { prim: 'ADD' },
                                                      { prim: 'COMPARE' },
                                                      { prim: 'NEQ' },
                                                      {
                                                        prim: 'IF',
                                                        args:
                                                          [[{ prim: 'DROP', args: [{ int: '2' }] },
                                                            {
                                                              prim: 'PUSH',
                                                              args: [{ prim: 'string' }, { string: 'BAD_FEES_RATIO' }]
                                                            },
                                                            { prim: 'FAILWITH' }],
                                                            [{ prim: 'SWAP' },
                                                              { prim: 'DUP' },
                                                              { prim: 'DUG', args: [{ int: '2' }] },
                                                              { prim: 'CDR' },
                                                              { prim: 'CDR' },
                                                              { prim: 'CDR' },
                                                              { prim: 'SWAP' },
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
                                                      }]]
                                              }],
                                                [{
                                                  prim: 'IF_LEFT',
                                                  args:
                                                    [[{ prim: 'SWAP' },
                                                      { prim: 'DUP' },
                                                      { prim: 'DUG', args: [{ int: '2' }] },
                                                      { prim: 'CDR' },
                                                      { prim: 'DUP', args: [{ int: '3' }] },
                                                      { prim: 'CAR' },
                                                      { prim: 'CDR' },
                                                      { prim: 'DIG', args: [{ int: '3' }] },
                                                      { prim: 'CAR' },
                                                      { prim: 'CAR' },
                                                      { prim: 'CDR' },
                                                      { prim: 'DIG', args: [{ int: '3' }] },
                                                      { prim: 'PAIR' },
                                                      { prim: 'PAIR' },
                                                      { prim: 'PAIR' },
                                                      { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                      { prim: 'PAIR' }],
                                                      [{ prim: 'SWAP' },
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
                                                }]]
                                          }]]
                                    },
                                    { prim: 'UNPAIR' },
                                    { prim: 'DUP', args: [{ int: '3' }] },
                                    { prim: 'CDR' },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'DUP', args: [{ int: '4' }] },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'CAR' },
                                    { prim: 'PAIR' },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'PAIR' },
                                    { prim: 'PAIR' },
                                    { prim: 'SWAP' },
                                    { prim: 'PAIR' }],
                                    [{ prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
                                      { prim: 'DIG', args: [{ int: '6' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'EXEC' },
                                      { prim: 'DROP' },
                                      { prim: 'SENDER' },
                                      { prim: 'DUP', args: [{ int: '3' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'COMPARE' },
                                      { prim: 'NEQ' },
                                      {
                                        prim: 'IF',
                                        args:
                                          [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'NOT_ORACLE' }] },
                                            { prim: 'FAILWITH' }],
                                            []]
                                      },
                                      {
                                        prim: 'IF_LEFT',
                                        args:
                                          [[{ prim: 'DIG', args: [{ int: '3' }] },
                                            { prim: 'DROP' },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CDR' },
                                            { prim: 'DUP', args: [{ int: '3' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'DUP', args: [{ int: '4' }] },
                                            { prim: 'DIG', args: [{ int: '3' }] },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'CAR' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'CDR' },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'DUP', args: [{ int: '4' }] },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'DIG', args: [{ int: '6' }] },
                                            { prim: 'SWAP' },
                                            { prim: 'EXEC' },
                                            { prim: 'SWAP' },
                                            { prim: 'DUP' },
                                            { prim: 'DUG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CDR' },
                                            { prim: 'DIG', args: [{ int: '3' }] },
                                            { prim: 'CDR' },
                                            {
                                              prim: 'ITER',
                                              args:
                                                [[{ prim: 'DUP', args: [{ int: '3' }] },
                                                  { prim: 'SWAP' },
                                                  { prim: 'DUP' },
                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                  { prim: 'SELF_ADDRESS' },
                                                  { prim: 'DUP', args: [{ int: '5' }] },
                                                  { prim: 'PAIR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'DUP', args: [{ int: '10' }] },
                                                  { prim: 'SWAP' },
                                                  { prim: 'EXEC' },
                                                  { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                                  { prim: 'SWAP' },
                                                  { prim: 'DUP' },
                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                  { prim: 'COMPARE' },
                                                  { prim: 'EQ' },
                                                  {
                                                    prim: 'IF',
                                                    args:
                                                      [[{ prim: 'DROP', args: [{ int: '3' }] }],
                                                        [{ prim: 'DIG', args: [{ int: '3' }] },
                                                          { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                                          { prim: 'PAIR' },
                                                          { prim: 'DIG', args: [{ int: '2' }] },
                                                          {
                                                            prim: 'ITER',
                                                            args:
                                                              [[{ prim: 'SWAP' },
                                                                { prim: 'UNPAIR' },
                                                                { prim: 'DIG', args: [{ int: '2' }] },
                                                                { prim: 'UNPAIR' },
                                                                { prim: 'SWAP' },
                                                                { prim: 'DUP', args: [{ int: '5' }] },
                                                                { prim: 'MUL' },
                                                                {
                                                                  prim: 'PUSH',
                                                                  args: [{ prim: 'nat' }, { int: '100' }]
                                                                },
                                                                { prim: 'SWAP' },
                                                                { prim: 'EDIV' },
                                                                {
                                                                  prim: 'IF_NONE',
                                                                  args:
                                                                    [[{
                                                                      prim: 'PUSH',
                                                                      args: [{ prim: 'nat' }, { int: '0' }]
                                                                    }],
                                                                      [{ prim: 'CAR' }]]
                                                                },
                                                                { prim: 'DUP' },
                                                                { prim: 'DUP', args: [{ int: '7' }] },
                                                                { prim: 'PAIR' },
                                                                { prim: 'DIG', args: [{ int: '2' }] },
                                                                { prim: 'DIG', args: [{ int: '4' }] },
                                                                { prim: 'DIG', args: [{ int: '2' }] },
                                                                { prim: 'UNPAIR' },
                                                                { prim: 'DUP' },
                                                                { prim: 'DUP', args: [{ int: '5' }] },
                                                                { prim: 'DUP', args: [{ int: '5' }] },
                                                                { prim: 'PAIR' },
                                                                { prim: 'PAIR' },
                                                                { prim: 'DUP', args: [{ int: '15' }] },
                                                                { prim: 'SWAP' },
                                                                { prim: 'EXEC' },
                                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                                { prim: 'SWAP' },
                                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                                { prim: 'ADD' },
                                                                { prim: 'SOME' },
                                                                { prim: 'DIG', args: [{ int: '2' }] },
                                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                                { prim: 'PAIR' },
                                                                { prim: 'UPDATE' },
                                                                { prim: 'SWAP' },
                                                                { prim: 'DIG', args: [{ int: '2' }] },
                                                                { prim: 'ADD' },
                                                                { prim: 'PAIR' }]]
                                                          },
                                                          { prim: 'UNPAIR' },
                                                          { prim: 'DIG', args: [{ int: '2' }] },
                                                          { prim: 'SUB' },
                                                          { prim: 'ISNAT' },
                                                          {
                                                            prim: 'IF_NONE',
                                                            args:
                                                              [[{
                                                                prim: 'PUSH',
                                                                args: [{ prim: 'string' }, { string: 'DISTRIBUTION_FAILED' }]
                                                              },
                                                                { prim: 'FAILWITH' }],
                                                                []]
                                                          },
                                                          { prim: 'SOME' },
                                                          { prim: 'DIG', args: [{ int: '2' }] },
                                                          { prim: 'SELF_ADDRESS' },
                                                          { prim: 'PAIR' },
                                                          { prim: 'UPDATE' }]]
                                                  }]]
                                            },
                                            { prim: 'SWAP' },
                                            { prim: 'DROP' },
                                            { prim: 'DIG', args: [{ int: '5' }] },
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
                                            { prim: 'PAIR' },
                                            { prim: 'DIG', args: [{ int: '2' }] },
                                            { prim: 'CAR' },
                                            { prim: 'CAR' },
                                            { prim: 'PAIR' },
                                            { prim: 'PAIR' },
                                            { prim: 'NIL', args: [{ prim: 'operation' }] },
                                            { prim: 'PAIR' }],
                                            [{ prim: 'DIG', args: [{ int: '4' }] },
                                              { prim: 'DROP' },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'CDR' },
                                              { prim: 'DUP', args: [{ int: '3' }] },
                                              { prim: 'CAR' },
                                              { prim: 'CDR' },
                                              { prim: 'CDR' },
                                              { prim: 'DUP', args: [{ int: '4' }] },
                                              { prim: 'DIG', args: [{ int: '3' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'CAR' },
                                              { prim: 'CDR' },
                                              { prim: 'CAR' },
                                              { prim: 'SELF_ADDRESS' },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'CDR' },
                                              { prim: 'PAIR' },
                                              { prim: 'DIG', args: [{ int: '8' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'EXEC' },
                                              { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
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
                                                    { prim: 'DROP' },
                                                    { prim: 'SWAP' },
                                                    { prim: 'DROP' },
                                                    { prim: 'DIG', args: [{ int: '4' }] },
                                                    { prim: 'DROP' }],
                                                    [{ prim: 'DIG', args: [{ int: '3' }] },
                                                      { prim: 'CAR' },
                                                      { prim: 'CDR' },
                                                      { prim: 'CDR' },
                                                      { prim: 'DUP', args: [{ int: '3' }] },
                                                      { prim: 'CAR' },
                                                      { prim: 'CAR' },
                                                      { prim: 'DIG', args: [{ int: '4' }] },
                                                      { prim: 'PAIR' },
                                                      { prim: 'PAIR' },
                                                      { prim: 'DIG', args: [{ int: '6' }] },
                                                      { prim: 'SWAP' },
                                                      { prim: 'EXEC' },
                                                      { prim: 'DUP', args: [{ int: '3' }] },
                                                      { prim: 'CDR' },
                                                      { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                                                      { prim: 'PAIR' },
                                                      { prim: 'SWAP' },
                                                      {
                                                        prim: 'ITER',
                                                        args:
                                                          [[{ prim: 'SWAP' },
                                                            { prim: 'UNPAIR' },
                                                            { prim: 'DIG', args: [{ int: '2' }] },
                                                            { prim: 'UNPAIR' },
                                                            { prim: 'SWAP' },
                                                            { prim: 'DUP', args: [{ int: '5' }] },
                                                            { prim: 'MUL' },
                                                            { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '100' }] },
                                                            { prim: 'SWAP' },
                                                            { prim: 'EDIV' },
                                                            {
                                                              prim: 'IF_NONE',
                                                              args:
                                                                [[{
                                                                  prim: 'PUSH',
                                                                  args: [{ prim: 'mutez' }, { int: '0' }]
                                                                }],
                                                                  [{ prim: 'CAR' }]]
                                                            },
                                                            { prim: 'DUP' },
                                                            { prim: 'DIG', args: [{ int: '2' }] },
                                                            { prim: 'DIG', args: [{ int: '4' }] },
                                                            { prim: 'DUP' },
                                                            { prim: 'DUP', args: [{ int: '3' }] },
                                                            { prim: 'GET' },
                                                            {
                                                              prim: 'IF_NONE',
                                                              args:
                                                                [[{ prim: 'DIG', args: [{ int: '2' }] }],
                                                                  [{
                                                                    prim: 'DIG',
                                                                    args: [{ int: '3' }]
                                                                  }, { prim: 'ADD' }]]
                                                            },
                                                            { prim: 'SOME' },
                                                            { prim: 'DIG', args: [{ int: '2' }] },
                                                            { prim: 'UPDATE' },
                                                            { prim: 'SWAP' },
                                                            { prim: 'DIG', args: [{ int: '2' }] },
                                                            { prim: 'ADD' },
                                                            { prim: 'PAIR' }]]
                                                      },
                                                      { prim: 'UNPAIR' },
                                                      { prim: 'DIG', args: [{ int: '2' }] },
                                                      { prim: 'SUB' },
                                                      { prim: 'SOME' },
                                                      { prim: 'SELF_ADDRESS' },
                                                      { prim: 'UPDATE' },
                                                      { prim: 'SWAP' },
                                                      { prim: 'CAR' },
                                                      { prim: 'PAIR' }]]
                                              },
                                              { prim: 'PAIR' },
                                              { prim: 'DIG', args: [{ int: '2' }] },
                                              { prim: 'CAR' },
                                              { prim: 'CAR' },
                                              { prim: 'PAIR' },
                                              { prim: 'PAIR' },
                                              { prim: 'NIL', args: [{ prim: 'operation' }] },
                                              { prim: 'PAIR' }]]
                                      }]]
                              }]]
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
                        { prim: 'DIG', args: [{ int: '10' }] },
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
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'DIG', args: [{ int: '10' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DROP' },
                                  { prim: 'SWAP' },
                                  { prim: 'DUP' },
                                  { prim: 'DUG', args: [{ int: '2' }] },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'CAR' },
                                  { prim: 'DIG', args: [{ int: '3' }] },
                                  { prim: 'SWAP' },
                                  { prim: 'EXEC' },
                                  { prim: 'DROP' },
                                  {
                                    prim: 'IF_LEFT',
                                    args:
                                      [[{ prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'DROP' },
                                        { prim: 'DIG', args: [{ int: '5' }] },
                                        { prim: 'DROP' },
                                        { prim: 'DIG', args: [{ int: '5' }] },
                                        { prim: 'DROP' },
                                        {
                                          prim: 'IF_LEFT',
                                          args:
                                            [[{ prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
                                              { prim: 'DIG', args: [{ int: '3' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'EXEC' },
                                              { prim: 'DROP' },
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
                                              { prim: 'DUP' },
                                              { prim: 'CDR' },
                                              { prim: 'CAR' },
                                              { prim: 'DIG', args: [{ int: '6' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'EXEC' },
                                              { prim: 'DROP' },
                                              { prim: 'DUP' },
                                              { prim: 'CDR' },
                                              { prim: 'CAR' },
                                              { prim: 'DIG', args: [{ int: '6' }] },
                                              { prim: 'SWAP' },
                                              { prim: 'EXEC' },
                                              { prim: 'DROP' },
                                              { prim: 'SWAP' },
                                              { prim: 'DUP' },
                                              { prim: 'DUG', args: [{ int: '2' }] },
                                              { prim: 'CDR' },
                                              { prim: 'DUP', args: [{ int: '3' }] },
                                              { prim: 'CAR' },
                                              { prim: 'CDR' },
                                              { prim: 'DIG', args: [{ int: '3' }] },
                                              { prim: 'CAR' },
                                              { prim: 'CAR' },
                                              { prim: 'DUP', args: [{ int: '4' }] },
                                              { prim: 'CDR' },
                                              { prim: 'SOME' },
                                              { prim: 'DIG', args: [{ int: '4' }] },
                                              { prim: 'CAR' },
                                              { prim: 'UPDATE' },
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
                                              [{ prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'SWAP' },
                                                { prim: 'EXEC' },
                                                { prim: 'DROP' },
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
                                                { prim: 'DUP' },
                                                { prim: 'CDR' },
                                                { prim: 'DIG', args: [{ int: '6' }] },
                                                { prim: 'SWAP' },
                                                { prim: 'EXEC' },
                                                { prim: 'DROP' },
                                                { prim: 'DUP' },
                                                { prim: 'CDR' },
                                                { prim: 'DIG', args: [{ int: '6' }] },
                                                { prim: 'SWAP' },
                                                { prim: 'EXEC' },
                                                { prim: 'DROP' },
                                                { prim: 'SWAP' },
                                                { prim: 'DUP' },
                                                { prim: 'DUG', args: [{ int: '2' }] },
                                                { prim: 'CDR' },
                                                { prim: 'DUP', args: [{ int: '3' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'DUP', args: [{ int: '3' }] },
                                                { prim: 'CDR' },
                                                { prim: 'SOME' },
                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'CAR' },
                                                { prim: 'UPDATE' },
                                                { prim: 'DIG', args: [{ int: '2' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
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
                                                { prim: 'PAIR' }]]
                                        }],
                                        [{ prim: 'DIG', args: [{ int: '5' }] },
                                          { prim: 'DROP' },
                                          {
                                            prim: 'IF_LEFT',
                                            args:
                                              [[{ prim: 'DIG', args: [{ int: '5' }] },
                                                { prim: 'DROP' },
                                                { prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
                                                { prim: 'DIG', args: [{ int: '4' }] },
                                                { prim: 'SWAP' },
                                                { prim: 'EXEC' },
                                                { prim: 'DROP' },
                                                { prim: 'SWAP' },
                                                { prim: 'DUP' },
                                                { prim: 'DUG', args: [{ int: '2' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'DUP' },
                                                { prim: 'CDR' },
                                                { prim: 'DUP', args: [{ int: '3' }] },
                                                { prim: 'CDR' },
                                                { prim: 'CAR' },
                                                { prim: 'PAIR' },
                                                { prim: 'DIG', args: [{ int: '4' }] },
                                                { prim: 'SWAP' },
                                                { prim: 'EXEC' },
                                                { prim: 'DROP' },
                                                { prim: 'DUP', args: [{ int: '3' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'CDR' },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'CDR' },
                                                { prim: 'DUP', args: [{ int: '3' }] },
                                                { prim: 'CDR' },
                                                { prim: 'CDR' },
                                                { prim: 'CDR' },
                                                { prim: 'DUP' },
                                                { prim: 'DUG', args: [{ int: '2' }] },
                                                { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '10000' }] },
                                                { prim: 'DUG', args: [{ int: '2' }] },
                                                { prim: 'MUL' },
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
                                                { prim: 'DUP' },
                                                { prim: 'DIG', args: [{ int: '2' }] },
                                                { prim: 'SUB' },
                                                { prim: 'ISNAT' },
                                                {
                                                  prim: 'IF_NONE',
                                                  args:
                                                    [[{
                                                      prim: 'PUSH',
                                                      args: [{ prim: 'string' }, { string: 'BAD_FEES' }]
                                                    },
                                                      { prim: 'FAILWITH' }],
                                                      []]
                                                },
                                                { prim: 'DUP', args: [{ int: '3' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
                                                { prim: 'DUP', args: [{ int: '5' }] },
                                                { prim: 'CAR' },
                                                { prim: 'PAIR' },
                                                { prim: 'DIG', args: [{ int: '7' }] },
                                                { prim: 'SWAP' },
                                                { prim: 'EXEC' },
                                                { prim: 'DUP' },
                                                { prim: 'UNPAIR' },
                                                { prim: 'DIG', args: [{ int: '8' }] },
                                                { prim: 'SWAP' },
                                                { prim: 'EXEC' },
                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'DUP', args: [{ int: '3' }] },
                                                { prim: 'PAIR' },
                                                { prim: 'DUP', args: [{ int: '7' }] },
                                                { prim: 'CDR' },
                                                { prim: 'CDR' },
                                                { prim: 'CAR' },
                                                { prim: 'PAIR' },
                                                { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                                { prim: 'DUP', args: [{ int: '6' }] },
                                                { prim: 'COMPARE' },
                                                { prim: 'GT' },
                                                {
                                                  prim: 'IF',
                                                  args:
                                                    [[{
                                                      prim: 'NIL',
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
                                                    },
                                                      { prim: 'DUP', args: [{ int: '6' }] },
                                                      { prim: 'DIG', args: [{ int: '4' }] },
                                                      { prim: 'PAIR' },
                                                      { prim: 'SELF_ADDRESS' },
                                                      { prim: 'PAIR' },
                                                      { prim: 'CONS' },
                                                      { prim: 'SWAP' },
                                                      { prim: 'CONS' }],
                                                      [{ prim: 'DIG', args: [{ int: '2' }] },
                                                        { prim: 'DROP' },
                                                        {
                                                          prim: 'NIL',
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
                                                        },
                                                        { prim: 'SWAP' },
                                                        { prim: 'CONS' }]]
                                                },
                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'PAIR' },
                                                { prim: 'SELF_ADDRESS' },
                                                { prim: 'DUP', args: [{ int: '7' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'DIG', args: [{ int: '2' }] },
                                                { prim: 'UNPAIR' },
                                                { prim: 'DUP', args: [{ int: '3' }] },
                                                { prim: 'SWAP' },
                                                { prim: 'DUP' },
                                                { prim: 'DUG', args: [{ int: '2' }] },
                                                { prim: 'DUP', args: [{ int: '6' }] },
                                                { prim: 'DIG', args: [{ int: '5' }] },
                                                { prim: 'DUG', args: [{ int: '2' }] },
                                                { prim: 'PAIR' },
                                                { prim: 'GET' },
                                                {
                                                  prim: 'IF_NONE',
                                                  args: [[{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] }], []]
                                                },
                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'ADD' },
                                                { prim: 'SOME' },
                                                { prim: 'DIG', args: [{ int: '2' }] },
                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'PAIR' },
                                                { prim: 'UPDATE' },
                                                { prim: 'DUP', args: [{ int: '6' }] },
                                                { prim: 'CDR' },
                                                { prim: 'DUP', args: [{ int: '7' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'DIG', args: [{ int: '5' }] },
                                                { prim: 'CDR' },
                                                { prim: 'UNIT' },
                                                { prim: 'DIG', args: [{ int: '7' }] },
                                                { prim: 'CDR' },
                                                { prim: 'CAR' },
                                                { prim: 'SWAP' },
                                                { prim: 'SOME' },
                                                { prim: 'SWAP' },
                                                { prim: 'UPDATE' },
                                                { prim: 'DUP', args: [{ int: '7' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'CAR' },
                                                { prim: 'PAIR' },
                                                { prim: 'DUP', args: [{ int: '7' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
                                                { prim: 'CAR' },
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
                                                { prim: 'DIG', args: [{ int: '6' }] },
                                                { prim: 'CAR' },
                                                { prim: 'CDR' },
                                                { prim: 'CAR' },
                                                { prim: 'DUP' },
                                                { prim: 'CDR' },
                                                { prim: 'DIG', args: [{ int: '5' }] },
                                                { prim: 'DIG', args: [{ int: '2' }] },
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
                                                { prim: 'NIL', args: [{ prim: 'operation' }] },
                                                { prim: 'DIG', args: [{ int: '3' }] },
                                                { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                                                { prim: 'DIG', args: [{ int: '4' }] },
                                                {
                                                  prim: 'RIGHT',
                                                  args:
                                                    [{
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
                                                },
                                                { prim: 'TRANSFER_TOKENS' },
                                                { prim: 'CONS' },
                                                { prim: 'PAIR' }],
                                                [{ prim: 'DIG', args: [{ int: '3' }] },
                                                  { prim: 'DROP' },
                                                  { prim: 'DIG', args: [{ int: '5' }] },
                                                  { prim: 'DROP' },
                                                  { prim: 'SWAP' },
                                                  { prim: 'DUP' },
                                                  { prim: 'DUG', args: [{ int: '2' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'DUP' },
                                                  { prim: 'CDR' },
                                                  { prim: 'DUP', args: [{ int: '3' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'DIG', args: [{ int: '4' }] },
                                                  { prim: 'SWAP' },
                                                  { prim: 'EXEC' },
                                                  { prim: 'DROP' },
                                                  { prim: 'DUP', args: [{ int: '3' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'AMOUNT' },
                                                  { prim: 'COMPARE' },
                                                  { prim: 'LT' },
                                                  {
                                                    prim: 'IF',
                                                    args:
                                                      [[{
                                                        prim: 'PUSH',
                                                        args: [{ prim: 'string' }, { string: 'FEES_TOO_LOW' }]
                                                      },
                                                        { prim: 'FAILWITH' }],
                                                        []]
                                                  },
                                                  { prim: 'DUP' },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'DUP', args: [{ int: '3' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'DIG', args: [{ int: '5' }] },
                                                  { prim: 'SWAP' },
                                                  { prim: 'EXEC' },
                                                  { prim: 'DIG', args: [{ int: '4' }] },
                                                  { prim: 'SWAP' },
                                                  { prim: 'EXEC' },
                                                  { prim: 'AMOUNT' },
                                                  { prim: 'SELF_ADDRESS' },
                                                  { prim: 'DUP', args: [{ int: '6' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'DUP' },
                                                  { prim: 'DUP', args: [{ int: '3' }] },
                                                  { prim: 'GET' },
                                                  {
                                                    prim: 'IF_NONE',
                                                    args:
                                                      [[{ prim: 'DIG', args: [{ int: '2' }] }],
                                                        [{ prim: 'DIG', args: [{ int: '3' }] }, { prim: 'ADD' }]]
                                                  },
                                                  { prim: 'SOME' },
                                                  { prim: 'DIG', args: [{ int: '2' }] },
                                                  { prim: 'UPDATE' },
                                                  { prim: 'DUP', args: [{ int: '5' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'DUP', args: [{ int: '6' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'DIG', args: [{ int: '4' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'UNIT' },
                                                  { prim: 'DUP', args: [{ int: '7' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'SWAP' },
                                                  { prim: 'SOME' },
                                                  { prim: 'SWAP' },
                                                  { prim: 'UPDATE' },
                                                  { prim: 'DUP', args: [{ int: '7' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'DUP', args: [{ int: '7' }] },
                                                  { prim: 'CAR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'CAR' },
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
                                                  { prim: 'DIG', args: [{ int: '6' }] },
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
                                                  { prim: 'DIG', args: [{ int: '2' }] },
                                                  { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
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
                                                  { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1' }] },
                                                  { prim: 'DUP', args: [{ int: '7' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'DIG', args: [{ int: '6' }] },
                                                  { prim: 'CDR' },
                                                  { prim: 'CDR' },
                                                  { prim: 'CAR' },
                                                  { prim: 'PAIR' },
                                                  { prim: 'CONS' },
                                                  {
                                                    prim: 'RIGHT',
                                                    args:
                                                      [{
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
                                                  },
                                                  { prim: 'TRANSFER_TOKENS' },
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
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'DROP' },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'DROP' },
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'DROP' },
                                    { prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
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
                                    { prim: 'DIG', args: [{ int: '3' }] },
                                    { prim: 'SWAP' },
                                    { prim: 'EXEC' },
                                    { prim: 'DROP' },
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
                                    { prim: 'DUP', args: [{ int: '5' }] },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'DUP', args: [{ int: '6' }] },
                                    { prim: 'CAR' },
                                    { prim: 'CDR' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'DUP', args: [{ int: '6' }] },
                                    { prim: 'CDR' },
                                    { prim: 'SOME' },
                                    { prim: 'DIG', args: [{ int: '6' }] },
                                    { prim: 'CAR' },
                                    { prim: 'UPDATE' },
                                    { prim: 'PAIR' },
                                    { prim: 'PAIR' },
                                    { prim: 'PAIR' },
                                    { prim: 'DIG', args: [{ int: '2' }] },
                                    { prim: 'CAR' },
                                    { prim: 'CAR' },
                                    { prim: 'PAIR' },
                                    { prim: 'PAIR' },
                                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                                    { prim: 'PAIR' }]]
                            }],
                              [{ prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'DROP' },
                                { prim: 'DIG', args: [{ int: '5' }] },
                                { prim: 'DROP' },
                                { prim: 'DIG', args: [{ int: '7' }] },
                                { prim: 'DROP' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'SWAP' },
                                { prim: 'EXEC' },
                                { prim: 'DROP' },
                                {
                                  prim: 'IF_LEFT',
                                  args:
                                    [[{ prim: 'DIG', args: [{ int: '4' }] },
                                      { prim: 'DROP' },
                                      { prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] },
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'EXEC' },
                                      { prim: 'DROP' },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'CAR' },
                                      { prim: 'PAIR' },
                                      { prim: 'DIG', args: [{ int: '4' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'EXEC' },
                                      { prim: 'DUP' },
                                      { prim: 'UNPAIR' },
                                      { prim: 'DIG', args: [{ int: '5' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'EXEC' },
                                      { prim: 'DUP', args: [{ int: '5' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'DUP', args: [{ int: '5' }] },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '10000' }] },
                                      { prim: 'DUG', args: [{ int: '2' }] },
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
                                      { prim: 'DUP', args: [{ int: '5' }] },
                                      { prim: 'CDR' },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'COMPARE' },
                                      { prim: 'LT' },
                                      {
                                        prim: 'IF',
                                        args:
                                          [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'FEES_TOO_LOW' }] },
                                            { prim: 'FAILWITH' }],
                                            []]
                                      },
                                      { prim: 'DUP' },
                                      { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
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
                                      { prim: 'DUP', args: [{ int: '7' }] },
                                      { prim: 'CDR' },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'DUP', args: [{ int: '8' }] },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'ADD' },
                                      { prim: 'DUP', args: [{ int: '6' }] },
                                      { prim: 'PAIR' },
                                      { prim: 'SENDER' },
                                      { prim: 'PAIR' },
                                      { prim: 'CONS' },
                                      {
                                        prim: 'LEFT',
                                        args:
                                          [{
                                            prim: 'list',
                                            args:
                                              [{
                                                prim: 'pair',
                                                args:
                                                  [{ prim: 'address' },
                                                    { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                              }]
                                          }]
                                      },
                                      { prim: 'TRANSFER_TOKENS' },
                                      { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] },
                                      { prim: 'DUP', args: [{ int: '6' }] },
                                      { prim: 'CDR' },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'COMPARE' },
                                      { prim: 'EQ' },
                                      {
                                        prim: 'IF',
                                        args:
                                          [[{ prim: 'SWAP' },
                                            { prim: 'DROP' },
                                            { prim: 'SWAP' },
                                            { prim: 'DROP' },
                                            { prim: 'NIL', args: [{ prim: 'operation' }] },
                                            { prim: 'SWAP' },
                                            { prim: 'CONS' }],
                                            [{ prim: 'NIL', args: [{ prim: 'operation' }] },
                                              { prim: 'DIG', args: [{ int: '2' }] },
                                              { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
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
                                              { prim: 'DUP', args: [{ int: '8' }] },
                                              { prim: 'CDR' },
                                              { prim: 'CDR' },
                                              { prim: 'CAR' },
                                              { prim: 'DIG', args: [{ int: '6' }] },
                                              { prim: 'PAIR' },
                                              { prim: 'SELF_ADDRESS' },
                                              { prim: 'PAIR' },
                                              { prim: 'CONS' },
                                              {
                                                prim: 'RIGHT',
                                                args:
                                                  [{
                                                    prim: 'list',
                                                    args:
                                                      [{
                                                        prim: 'pair',
                                                        args:
                                                          [{ prim: 'address' },
                                                            { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                                      }]
                                                  }]
                                              },
                                              { prim: 'TRANSFER_TOKENS' },
                                              { prim: 'CONS' },
                                              { prim: 'SWAP' },
                                              { prim: 'CONS' }]]
                                      },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'CDR' },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'PAIR' },
                                      { prim: 'SELF_ADDRESS' },
                                      { prim: 'DUP', args: [{ int: '4' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'UNPAIR' },
                                      { prim: 'DUP', args: [{ int: '3' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'DUP' },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'DUP', args: [{ int: '6' }] },
                                      { prim: 'DIG', args: [{ int: '5' }] },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'PAIR' },
                                      { prim: 'GET' },
                                      {
                                        prim: 'IF_NONE',
                                        args: [[{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] }], []]
                                      },
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'ADD' },
                                      { prim: 'SOME' },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'PAIR' },
                                      { prim: 'UPDATE' },
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
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'DUP', args: [{ int: '6' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CDR' },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'PAIR' },
                                      { prim: 'PAIR' },
                                      { prim: 'PAIR' },
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'CAR' },
                                      { prim: 'CAR' },
                                      { prim: 'PAIR' },
                                      { prim: 'PAIR' },
                                      { prim: 'SWAP' },
                                      { prim: 'PAIR' }],
                                      [{ prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'DROP' },
                                        { prim: 'DIG', args: [{ int: '4' }] },
                                        { prim: 'DROP' },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CDR' },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'AMOUNT' },
                                        { prim: 'COMPARE' },
                                        { prim: 'LT' },
                                        {
                                          prim: 'IF',
                                          args:
                                            [[{ prim: 'PUSH', args: [{ prim: 'string' }, { string: 'FEES_TOO_LOW' }] },
                                              { prim: 'FAILWITH' }],
                                              []]
                                        },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'SWAP' },
                                        { prim: 'DUP' },
                                        { prim: 'DUG', args: [{ int: '2' }] },
                                        { prim: 'CAR' },
                                        { prim: 'PAIR' },
                                        { prim: 'DIG', args: [{ int: '4' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'EXEC' },
                                        { prim: 'DIG', args: [{ int: '3' }] },
                                        { prim: 'SWAP' },
                                        { prim: 'EXEC' },
                                        { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
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
                                        { prim: 'PUSH', args: [{ prim: 'nat' }, { int: '1' }] },
                                        { prim: 'DIG', args: [{ int: '4' }] },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'PAIR' },
                                        { prim: 'SENDER' },
                                        { prim: 'PAIR' },
                                        { prim: 'CONS' },
                                        {
                                          prim: 'LEFT',
                                          args:
                                            [{
                                              prim: 'list',
                                              args:
                                                [{
                                                  prim: 'pair',
                                                  args:
                                                    [{ prim: 'address' },
                                                      { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'nat' }] }]
                                                }]
                                            }]
                                        },
                                        { prim: 'TRANSFER_TOKENS' },
                                        { prim: 'AMOUNT' },
                                        { prim: 'SELF_ADDRESS' },
                                        { prim: 'DUP', args: [{ int: '4' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'DUP' },
                                        { prim: 'DUP', args: [{ int: '3' }] },
                                        { prim: 'GET' },
                                        {
                                          prim: 'IF_NONE',
                                          args:
                                            [[{ prim: 'DIG', args: [{ int: '2' }] }],
                                              [{ prim: 'DIG', args: [{ int: '3' }] }, { prim: 'ADD' }]]
                                        },
                                        { prim: 'SOME' },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'UPDATE' },
                                        { prim: 'DUP', args: [{ int: '3' }] },
                                        { prim: 'CDR' },
                                        { prim: 'DUP', args: [{ int: '4' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CDR' },
                                        { prim: 'DIG', args: [{ int: '2' }] },
                                        { prim: 'DUP', args: [{ int: '5' }] },
                                        { prim: 'CAR' },
                                        { prim: 'CDR' },
                                        { prim: 'CAR' },
                                        { prim: 'CAR' },
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
                                }]]
                        }]]
                }]]
          }],
      storage:
        {
          prim: 'Pair',
          args:
            [[{
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
                              { bytes: '0134306083fdc44db7cca4c4f1eb42f8fab2198d2900' }]
                        },
                          { prim: 'Pair', args: [{ prim: 'False' }, { prim: 'None' }] }]
                    },
                      { bytes: '0134306083fdc44db7cca4c4f1eb42f8fab2198d2900' }]
                },
                  {
                    prim: 'Pair',
                    args:
                      [{
                        prim: 'Pair',
                        args:
                          [[{
                            prim: 'Elt',
                            args:
                              [{ bytes: '1f9840a85d5af5bf1d1762f925bdaddc4201f984' },
                                {
                                  prim: 'Pair',
                                  args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '16' }]
                                }]
                          },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: '2260fac5e5542a773aa44fbcfedf7c193bc2c599' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '19' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: '2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '9' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: '4fabb145d64652a948d72533023f6e7a623c7c53' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '1' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: '50d1c9771902476076ecfc8b2a83ad6b9355a4c9' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '6' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: '514910771af9ca656af840dff83e8264ecf986ca' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '10' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: '6b175474e89094c44da98b954eedeac495271d0f' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '5' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: '6b3595068778dd592e39a122f4f5a5cf09c90fe2' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '15' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: '6f259637dcd74c767781e37bc6133cd6a68aa161' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '7' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: '7421a18de2ee1dc8b84e42eb00d8b73578c23526' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0181e59d439a9d27a80396e2f360d9de8cbc4a1ef300' }, { int: '0' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: '75231f58b43240c9718dd58b4967c5114342a86c' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '13' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: '7d1afa7b718fb893db30a3abc0cfc608aacfebb0' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '11' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: '7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '0' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: '8e870d67f660d95d5be530380d0ec0bd388289e1' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '14' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: '9f8f72aa9304c8b593d555f12ef6589cc3a579a2' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '12' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: 'a0b73e1ff0b80914ab6fe0444e65848c4c34450b' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '4' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: 'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '17' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: 'aaaebe6fe48e54f431b0c390cfaf0b017d09d42d' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '2' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: 'c00e94cb662c3520282e6f5717214004a7f26888' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '3' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '20' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: 'dac17f958d2ee523a2206206994597c13d831ec7' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '18' }]
                                  }]
                            },
                            {
                              prim: 'Elt',
                              args:
                                [{ bytes: 'df574c24545e5ffecb9a659c229253d4111d87e1' },
                                  {
                                    prim: 'Pair',
                                    args: [{ bytes: '0100f42eb1f25677dd7b0a94aba3a7aea61e2fd30d00' }, { int: '8' }]
                                  }]
                            }],
                            [{
                              prim: 'Elt',
                              args:
                                [{ bytes: '60e4d786628fea6478f785a6d7e704777c86a7c6' },
                                  { bytes: '015fbfcf4cd3f3c74ae5e28f69f73522ad2cc8129900' }]
                            },
                              {
                                prim: 'Elt',
                                args:
                                  [{ bytes: '629a673a8242c2ac4b7b8c5d8735fbeac21a6205' },
                                    { bytes: '01a0ff758e314e745756cbcd4df9480da336c1674100' }]
                              },
                              {
                                prim: 'Elt',
                                args:
                                  [{ bytes: '7bd29408f11d2bfc23c34f18275bbf23bb716bc7' },
                                    { bytes: '01b1e1bfc549470cdcbd8f41c85348a5605a95d9f400' }]
                              },
                              {
                                prim: 'Elt',
                                args:
                                  [{ bytes: 'b932a70a57673d89f4acffbe830e8ed7f75fb9e0' },
                                    { bytes: '01786fbc5ae3ab516cfbe07b6891ee3e8c320a827a00' }]
                              },
                              {
                                prim: 'Elt',
                                args:
                                  [{ bytes: 'bc4ca0eda7647a8ab7c2061c2e118a18a936f13d' },
                                    { bytes: '016ff17144ceac56c251b220f8a75d956737a4887800' }]
                              }]]
                      },
                        { int: '1782' }]
                  }]
            },
              {
                prim: 'Pair',
                args:
                  [{
                    prim: 'Pair',
                    args:
                      [[{
                        prim: 'Elt',
                        args:
                          [{ bytes: '004bda41909e3cdca6c05755548666dbc9d8bf01f3' },
                            { bytes: '00007695badbbad69da8368e52b0e0b808cea9fc2901' }]
                      },
                        {
                          prim: 'Elt',
                          args:
                            [{ bytes: '019deac9800ab2f1cef7f5bb4a119ef096df1dfdce' },
                              { bytes: '0000eb96f20e8f902ec45f4e97a26ae7e0190840cd55' }]
                        },
                        {
                          prim: 'Elt',
                          args:
                            [{ bytes: '01a43767d27595305cfdb0f53aab56a8f3660c5e28' },
                              { bytes: '0000b132d10ffc902767092839b3b844164698790c4f' }]
                        },
                        {
                          prim: 'Elt',
                          args:
                            [{ bytes: '01bc76c69a684533a78adf5b9d02e8214202e4e94b' },
                              { bytes: '0000b779baf26e03b56f9de26731a446cd6018d68ad9' }]
                        },
                        {
                          prim: 'Elt',
                          args:
                            [{ bytes: '01ed5c16e6124a9396928a9a747a59e3c38a5fd35e' },
                              { bytes: '00008aaa532bc2fdbd8fbb6149a7060bcedcff3c993c' }]
                        }],
                        { int: '1783' }]
                  },
                    { int: '1784' }]
              },
              {
                prim: 'Pair',
                args:
                  [{
                    prim: 'Pair',
                    args:
                      [{ bytes: '01b1f2a806608e615074cce263acd83220ba9b83f700' },
                        { bytes: '0000f5d46a55bd2834cb34b55e467830d42bb23a30db' }]
                  },
                    { prim: 'Pair', args: [{ int: '15' }, { int: '15' }] }]
              },
              { prim: 'Pair', args: [{ int: '1000000' }, { int: '1000000' }] },
              {
                prim: 'Pair',
                args: [{ int: '7' }, { prim: 'Pair', args: [{ int: '26' }, { int: '67' }] }]
              },
              { bytes: '01b5c16c9d3059d998765c94018c8831dd32b3cd3900' }],
              { int: '1785' }]
        }
    },
  entrypoints:
    {
      entrypoints:
        {
          withdraw_xtz: { prim: 'mutez' },
          withdraw_token:
            {
              prim: 'pair',
              args:
                [{ prim: 'address', annots: ['%fa2'] },
                  { prim: 'nat', annots: ['%token_id'] },
                  { prim: 'nat', annots: ['%amount'] }]
            },
          withdraw_all_xtz: { prim: 'unit' },
          withdraw_all_tokens:
            {
              prim: 'pair',
              args:
                [{ prim: 'address', annots: ['%fa2'] },
                  { prim: 'list', args: [{ prim: 'nat' }], annots: ['%tokens'] }]
            },
          unwrap_erc721:
            {
              prim: 'pair',
              args:
                [{ prim: 'bytes', annots: ['%erc_721'] },
                  { prim: 'nat', annots: ['%token_id'] },
                  { prim: 'bytes', annots: ['%destination'] }]
            },
          unwrap_erc20:
            {
              prim: 'pair',
              args:
                [{ prim: 'bytes', annots: ['%erc_20'] },
                  { prim: 'nat', annots: ['%amount'] },
                  { prim: 'nat', annots: ['%fees'] },
                  { prim: 'bytes', annots: ['%destination'] }]
            },
          unwrap:
            {
              prim: 'or',
              args:
                [{
                  prim: 'pair',
                  args:
                    [{ prim: 'bytes', annots: ['%erc_20'] },
                      { prim: 'nat', annots: ['%amount'] },
                      { prim: 'nat', annots: ['%fees'] },
                      { prim: 'bytes', annots: ['%destination'] }],
                  annots: ['%unwrap_erc20']
                },
                  {
                    prim: 'pair',
                    args:
                      [{ prim: 'bytes', annots: ['%erc_721'] },
                        { prim: 'nat', annots: ['%token_id'] },
                        { prim: 'bytes', annots: ['%destination'] }],
                    annots: ['%unwrap_erc721']
                  }]
            },
          signer_ops:
            {
              prim: 'pair',
              args:
                [{ prim: 'key_hash', annots: ['%signer'] },
                  { prim: 'address', annots: ['%payment_address'] }]
            },
          signer:
            {
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
                  }]
            },
          set_staking: { prim: 'address' },
          set_signer: { prim: 'address' },
          set_oracle: { prim: 'address' },
          set_governance: { prim: 'address' },
          set_fees_share:
            {
              prim: 'pair',
              args:
                [{ prim: 'nat', annots: ['%dev_pool'] },
                  { prim: 'nat', annots: ['%signers'] },
                  { prim: 'nat', annots: ['%staking'] }]
            },
          set_erc721_wrapping_fees: { prim: 'mutez' },
          set_erc721_unwrapping_fees: { prim: 'mutez' },
          set_erc20_wrapping_fees: { prim: 'nat' },
          set_erc20_unwrapping_fees: { prim: 'nat' },
          set_dev_pool: { prim: 'address' },
          set_administrator: { prim: 'address' },
          pause_contract: { prim: 'bool' },
          oracle:
            {
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
            },
          mint_erc721:
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
                  { prim: 'nat', annots: ['%token_id'] }]
            },
          mint_erc20:
            {
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
                  { prim: 'nat', annots: ['%amount'] }]
            },
          governance:
            {
              prim: 'or',
              args:
                [{
                  prim: 'or',
                  args:
                    [{
                      prim: 'or',
                      args:
                        [{ prim: 'address', annots: ['%set_dev_pool'] },
                          { prim: 'nat', annots: ['%set_erc20_unwrapping_fees'] }]
                    },
                      {
                        prim: 'or',
                        args:
                          [{ prim: 'nat', annots: ['%set_erc20_wrapping_fees'] },
                            { prim: 'mutez', annots: ['%set_erc721_unwrapping_fees'] }]
                      }]
                },
                  {
                    prim: 'or',
                    args:
                      [{
                        prim: 'or',
                        args:
                          [{ prim: 'mutez', annots: ['%set_erc721_wrapping_fees'] },
                            {
                              prim: 'pair',
                              args:
                                [{ prim: 'nat', annots: ['%dev_pool'] },
                                  { prim: 'nat', annots: ['%signers'] },
                                  { prim: 'nat', annots: ['%staking'] }],
                              annots: ['%set_fees_share']
                            }]
                      },
                        {
                          prim: 'or',
                          args:
                            [{ prim: 'address', annots: ['%set_governance'] },
                              { prim: 'address', annots: ['%set_staking'] }]
                        }]
                  }]
            },
          fees:
            {
              prim: 'or',
              args:
                [{
                  prim: 'or',
                  args:
                    [{
                      prim: 'pair',
                      args:
                        [{ prim: 'address', annots: ['%fa2'] },
                          { prim: 'list', args: [{ prim: 'nat' }], annots: ['%tokens'] }],
                      annots: ['%withdraw_all_tokens']
                    },
                      { prim: 'unit', annots: ['%withdraw_all_xtz'] }]
                },
                  {
                    prim: 'or',
                    args:
                      [{
                        prim: 'pair',
                        args:
                          [{ prim: 'address', annots: ['%fa2'] },
                            { prim: 'nat', annots: ['%token_id'] },
                            { prim: 'nat', annots: ['%amount'] }],
                        annots: ['%withdraw_token']
                      },
                        { prim: 'mutez', annots: ['%withdraw_xtz'] }]
                  }]
            },
          distribute_xtz: { prim: 'list', args: [{ prim: 'key_hash' }] },
          distribute_tokens:
            {
              prim: 'pair',
              args:
                [{ prim: 'list', args: [{ prim: 'key_hash' }], annots: ['%signers'] },
                  {
                    prim: 'list',
                    args: [{ prim: 'pair', args: [{ prim: 'address' }, { prim: 'nat' }] }],
                    annots: ['%tokens']
                  }]
            },
          contract_admin:
            {
              prim: 'or',
              args:
                [{
                  prim: 'or',
                  args:
                    [{
                      prim: 'or',
                      args:
                        [{ prim: 'unit', annots: ['%confirm_minter_admin'] },
                          { prim: 'bool', annots: ['%pause_contract'] }]
                    },
                      {
                        prim: 'or',
                        args:
                          [{ prim: 'address', annots: ['%set_administrator'] },
                            { prim: 'address', annots: ['%set_oracle'] }]
                      }]
                },
                  { prim: 'address', annots: ['%set_signer'] }]
            },
          confirm_minter_admin: { prim: 'unit' },
          add_erc721:
            {
              prim: 'pair',
              args:
                [{ prim: 'bytes', annots: ['%eth_contract'] },
                  { prim: 'address', annots: ['%token_contract'] }]
            },
          add_erc20:
            {
              prim: 'pair',
              args:
                [{ prim: 'bytes', annots: ['%eth_contract'] },
                  {
                    prim: 'pair',
                    args: [{ prim: 'address' }, { prim: 'nat' }],
                    annots: ['%token_address']
                  }]
            }
        }
    }
};