
const basicExample = {
    id: 'demo@0.1.0',
    nodes: {
        1: {
            id: 1,
            data: {
                num: 2,
                style: 'rgb(85,126,19,0.8) !important',
                a: 'mnist',
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ]
                ]
            },
            inputs: {},
            outputs: {
                child: {
                    connections: [
                        {
                            node: 4,
                            input: 'parent',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                0,
                -84
            ],
            name: 'Input'
        },
        2: {
            id: 2,
            data: {
                style: 'rgb(85,126,19,0.8) !important',
                size: 10,
                lr: 0.01,
                e: 6,
                bs: 64,
                a: 'softmax',
                l: 'X-Entropy',
                o: 'SGD'
            },
            inputs: {
                parent: {
                    connections: [
                        {
                            node: 6,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {},
            position: [
                1145.5241578379412,
                -224
            ],
            name: 'Output'
        },
        4: {
            id: 4,
            data: {
                style: 'rgba(140, 80, 18, 0.8) !important',
                filters: 16,
                kx: '3,3',
                sx: '1,1',
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ],
                    [
                        4,
                        'l4 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l1)'
                    ]
                ],
                a: 'relu'
            },
            inputs: {
                parent: {
                    connections: [
                        {
                            node: 1,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {
                child: {
                    connections: [
                        {
                            node: 5,
                            input: 'parent',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                276,
                -155
            ],
            name: 'Conv2D'
        },
        5: {
            id: 5,
            data: {
                style: 'rgb(97, 18, 140, 0.8) !important',
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ],
                    [
                        4,
                        'l4 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l1)'
                    ],
                    [
                        5,
                        'l5 = Flatten()(l4)'
                    ]
                ]
            },
            inputs: {
                parent: {
                    connections: [
                        {
                            node: 4,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {
                child: {
                    connections: [
                        {
                            node: 6,
                            input: 'parent',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                595,
                -62
            ],
            name: 'Flatten'
        },
        6: {
            id: 6,
            data: {
                style: 'rgba(140, 80, 18, 0.8) !important',
                size: 32,
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ],
                    [
                        4,
                        'l4 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l1)'
                    ],
                    [
                        5,
                        'l5 = Flatten()(l4)'
                    ],
                    [
                        6,
                        'l6 = Dense(32, activation=\'relu\')(l5)'
                    ],
                    [
                        2,
                        'l2 = Dense(10, activation=\'softmax\')(l6)'
                    ]
                ],
                a: 'relu'
            },
            inputs: {
                parent: {
                    connections: [
                        {
                            node: 5,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {
                child: {
                    connections: [
                        {
                            node: 2,
                            input: 'parent',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                825,
                -109
            ],
            name: 'Dense'
        }
    }
};

const resNetExample = {
    id: 'demo@0.1.0',
    nodes: {
        1: {
            id: 1,
            data: {
                num: 2,
                style: 'rgb(85,126,19,0.8) !important',
                a: 'mnist',
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ]
                ]
            },
            inputs: {},
            outputs: {
                child: {
                    connections: [
                        {
                            node: 4,
                            input: 'parent',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                296.09421062631225,
                -52.59606856993658
            ],
            name: 'Input'
        },
        2: {
            id: 2,
            data: {
                style: 'rgb(85,126,19,0.8) !important',
                size: 10,
                lr: 0.01,
                e: 6,
                bs: 64,
                a: 'softmax',
                o: 'RMSprop',
                l: 'X-Entropy'
            },
            inputs: {
                parent: {
                    connections: [
                        {
                            node: 9,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {},
            position: [
                2503.7443781342763,
                -169.59006638247385
            ],
            name: 'Output'
        },
        4: {
            id: 4,
            data: {
                style: 'rgba(140, 80, 18, 0.8) !important',
                filters: 16,
                kx: '3,3',
                sx: '1,1',
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ],
                    [
                        4,
                        'l4 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l1)'
                    ]
                ],
                a: 'relu'
            },
            inputs: {
                parent: {
                    connections: [
                        {
                            node: 1,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {
                child: {
                    connections: [
                        {
                            node: 10,
                            input: 'parent',
                            data: {}
                        },
                        {
                            node: 14,
                            input: 'parent2',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                572.0942106263122,
                -123.59606856993658
            ],
            name: 'Conv2D'
        },
        5: {
            id: 5,
            data: {
                style: 'rgb(97, 18, 140, 0.8) !important',
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ],
                    [
                        4,
                        'l4 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l1)'
                    ],
                    [
                        10,
                        'l10 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l4)'
                    ],
                    [
                        11,
                        'l11 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l10)'
                    ],
                    [
                        14,
                        'l14 = Add()([l11,l4])'
                    ],
                    [
                        12,
                        'l12 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l14)'
                    ],
                    [
                        13,
                        'l13 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l12)'
                    ],
                    [
                        15,
                        'l15 = Add()([l14,l13])'
                    ],
                    [
                        5,
                        'l5 = Flatten()(l15)'
                    ]
                ]
            },
            inputs: {
                parent: {
                    connections: [
                        {
                            node: 15,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {
                child: {
                    connections: [
                        {
                            node: 6,
                            input: 'parent',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                1694.463489480539,
                -23.176465261880658
            ],
            name: 'Flatten'
        },
        6: {
            id: 6,
            data: {
                style: 'rgba(140, 80, 18, 0.8) !important',
                size: 32,
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ],
                    [
                        4,
                        'l4 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l1)'
                    ],
                    [
                        10,
                        'l10 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l4)'
                    ],
                    [
                        11,
                        'l11 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l10)'
                    ],
                    [
                        14,
                        'l14 = Add()([l11,l4])'
                    ],
                    [
                        12,
                        'l12 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l14)'
                    ],
                    [
                        13,
                        'l13 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l12)'
                    ],
                    [
                        15,
                        'l15 = Add()([l14,l13])'
                    ],
                    [
                        5,
                        'l5 = Flatten()(l15)'
                    ],
                    [
                        6,
                        'l6 = Dense(32, activation=\'relu\')(l5)'
                    ]
                ],
                a: 'relu'
            },
            inputs: {
                parent: {
                    connections: [
                        {
                            node: 5,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {
                child: {
                    connections: [
                        {
                            node: 9,
                            input: 'parent',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                1921.5077278842323,
                -60.2350943305709
            ],
            name: 'Dense'
        },
        9: {
            id: 9,
            data: {
                style: 'rgb(97, 18, 140, 0.8) !important',
                r: 0.5,
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ],
                    [
                        4,
                        'l4 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l1)'
                    ],
                    [
                        10,
                        'l10 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l4)'
                    ],
                    [
                        11,
                        'l11 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l10)'
                    ],
                    [
                        14,
                        'l14 = Add()([l11,l4])'
                    ],
                    [
                        12,
                        'l12 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l14)'
                    ],
                    [
                        13,
                        'l13 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l12)'
                    ],
                    [
                        15,
                        'l15 = Add()([l14,l13])'
                    ],
                    [
                        5,
                        'l5 = Flatten()(l15)'
                    ],
                    [
                        6,
                        'l6 = Dense(32, activation=\'relu\')(l5)'
                    ],
                    [
                        9,
                        'l9 = Dropout(rate=0.5)(l6)'
                    ],
                    [
                        2,
                        'l2 = Dense(10, activation=\'softmax\')(l9)'
                    ]
                ]
            },
            inputs: {
                parent: {
                    connections: [
                        {
                            node: 6,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {
                child: {
                    connections: [
                        {
                            node: 2,
                            input: 'parent',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                2240.5077278842323,
                -34.35341887665306
            ],
            name: 'Dropout'
        },
        10: {
            id: 10,
            data: {
                style: 'rgba(140, 80, 18, 0.8) !important',
                filters: 16,
                kx: '3,3',
                sx: '1,1',
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ],
                    [
                        4,
                        'l4 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l1)'
                    ],
                    [
                        10,
                        'l10 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l4)'
                    ]
                ],
                a: 'relu'
            },
            inputs: {
                parent: {
                    connections: [
                        {
                            node: 4,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {
                child: {
                    connections: [
                        {
                            node: 11,
                            input: 'parent',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                585.71162275878,
                -478.4736551398337
            ],
            name: 'Conv2D'
        },
        11: {
            id: 11,
            data: {
                style: 'rgba(140, 80, 18, 0.8) !important',
                filters: 16,
                kx: '3,3',
                sx: '1,1',
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ],
                    [
                        4,
                        'l4 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l1)'
                    ],
                    [
                        10,
                        'l10 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l4)'
                    ],
                    [
                        11,
                        'l11 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l10)'
                    ]
                ],
                a: 'relu'
            },
            inputs: {
                parent: {
                    connections: [
                        {
                            node: 10,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {
                child: {
                    connections: [
                        {
                            node: 14,
                            input: 'parent1',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                895.8443413727845,
                -475.51783223581424
            ],
            name: 'Conv2D'
        },
        12: {
            id: 12,
            data: {
                style: 'rgba(140, 80, 18, 0.8) !important',
                filters: 16,
                kx: '3,3',
                sx: '1,1',
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ],
                    [
                        4,
                        'l4 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l1)'
                    ],
                    [
                        10,
                        'l10 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l4)'
                    ],
                    [
                        11,
                        'l11 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l10)'
                    ],
                    [
                        14,
                        'l14 = Add()([l11,l4])'
                    ],
                    [
                        12,
                        'l12 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l14)'
                    ]
                ],
                a: 'relu'
            },
            inputs: {
                parent: {
                    connections: [
                        {
                            node: 14,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {
                child: {
                    connections: [
                        {
                            node: 13,
                            input: 'parent',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                1035.745756766094,
                -114.34508916717883
            ],
            name: 'Conv2D'
        },
        13: {
            id: 13,
            data: {
                style: 'rgba(140, 80, 18, 0.8) !important',
                filters: 16,
                kx: '3,3',
                sx: '1,1',
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ],
                    [
                        4,
                        'l4 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l1)'
                    ],
                    [
                        10,
                        'l10 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l4)'
                    ],
                    [
                        11,
                        'l11 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l10)'
                    ],
                    [
                        14,
                        'l14 = Add()([l11,l4])'
                    ],
                    [
                        12,
                        'l12 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l14)'
                    ],
                    [
                        13,
                        'l13 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l12)'
                    ]
                ],
                a: 'relu'
            },
            inputs: {
                parent: {
                    connections: [
                        {
                            node: 12,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {
                child: {
                    connections: [
                        {
                            node: 15,
                            input: 'parent2',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                1339.2783608346308,
                -113.32776779456647
            ],
            name: 'Conv2D'
        },
        14: {
            id: 14,
            data: {
                style: 'rgb(148,132,55) !important',
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ],
                    [
                        4,
                        'l4 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l1)'
                    ],
                    [
                        10,
                        'l10 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l4)'
                    ],
                    [
                        11,
                        'l11 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l10)'
                    ],
                    [
                        14,
                        'l14 = Add()([l11,l4])'
                    ]
                ]
            },
            inputs: {
                parent1: {
                    connections: [
                        {
                            node: 11,
                            output: 'child',
                            data: {}
                        }
                    ]
                },
                parent2: {
                    connections: [
                        {
                            node: 4,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {
                child: {
                    connections: [
                        {
                            node: 12,
                            input: 'parent',
                            data: {}
                        },
                        {
                            node: 15,
                            input: 'parent1',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                1206.1633357779972,
                -353.8574232279738
            ],
            name: 'Add'
        },
        15: {
            id: 15,
            data: {
                style: 'rgb(148,132,55) !important',
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ],
                    [
                        4,
                        'l4 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l1)'
                    ],
                    [
                        10,
                        'l10 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l4)'
                    ],
                    [
                        11,
                        'l11 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l10)'
                    ],
                    [
                        14,
                        'l14 = Add()([l11,l4])'
                    ],
                    [
                        12,
                        'l12 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l14)'
                    ],
                    [
                        13,
                        'l13 = Conv2D(16, (3,3), strides=(1,1), activation=\'relu\', padding=\'same\')(l12)'
                    ],
                    [
                        15,
                        'l15 = Add()([l14,l13])'
                    ]
                ]
            },
            inputs: {
                parent1: {
                    connections: [
                        {
                            node: 14,
                            output: 'child',
                            data: {}
                        }
                    ]
                },
                parent2: {
                    connections: [
                        {
                            node: 13,
                            output: 'child',
                            data: {}
                        }
                    ]
                }
            },
            outputs: {
                child: {
                    connections: [
                        {
                            node: 5,
                            input: 'parent',
                            data: {}
                        }
                    ]
                }
            },
            position: [
                1681.654383030566,
                -229.21332484721245
            ],
            name: 'Add'
        }
    }
};

const blankExample = {
    id: 'demo@0.1.0',
    nodes: {
        1: {
            id: 1,
            data: {
                num: 2,
                style: 'rgb(85,126,19,0.8) !important',
                a: 'mnist',
                dataset: {
                    IMAGE_HEIGHT: 28,
                    IMAGE_WIDTH: 28,
                    IMAGE_CHANNELS: 1,
                    NUM_CLASSES: 10,
                    NAME: 'mnist'
                },
                pythonLines: [
                    [
                        1,
                        'l1 = Input(shape=input_shape)'
                    ]
                ]
            },
            inputs: {},
            outputs: {
                child: {
                    connections: []
                }
            },
            position: [
                20,
                50
            ],
            name: 'Input'
        },
        2: {
            id: 2,
            data: {
                style: 'rgb(85,126,19,0.8) !important',
                size: 10,
                lr: 0.01,
                e: 6,
                bs: 64,
                a: 'softmax',
                o: 'SGD',
                l: 'X-Entropy'
            },
            inputs: {
                parent: {
                    connections: []
                }
            },
            outputs: {},
            position: [
                893.0252694289113,
                49.631400942854484
            ],
            name: 'Output'
        }
    }
};

export { basicExample, resNetExample, blankExample };
