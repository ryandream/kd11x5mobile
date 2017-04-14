/*
* 对应于GameBettingSelectBalls号码选择器类型: 
* type1 // 万位 + 千位 + 百位 + 十位 + 个位 : hasTool : 重复
* type2 // 万位 + 千位 + 百位 : hasTool : !重复
* type2 // 千位 + 百位 + 十位 : hasTool : !重复
* type2 // 百位 + 十位 + 个位 : hasTool : !重复
* type3 // 万位 + 千位 : hasTool : !重复
* type3 // 十位 + 个位 : hasTool : !重复
* type4 // 胆码 + 拖码 : !hasTool : !重复
* type5 // 组选 : hasTool : !重复
* max 最多胆码个数
* mins 单项至少个数
* totalMin 所有至少个数
*/
export default {
    t1: {// 和值
        tip: '至少选择1个和值投注，选号与五个开奖号码一致即中奖，奖金{{min}}-{{max}}倍。和值投注大小单双，开奖的5个号码相加的数值是“30”即是和'
    },
    t2: { // 二码
        id036: { // 前二直选 : type5 // 万位 + 千位 : hasTool : !重复
            tip: '从万位、千位中至少各选择1个号码组成一注。',
            type: 3,
            titles: ['万位', '千位'],
            mins: [1, 1],
            totalMin: 2
        },
        id037: { // 前二组选 : type8 // 前二组选 : hasTool : !重复
            tip: '从01-11中任意选择2个或2个以上号码组成一注。',
            type: 5,
            titles: ['前二组选'],
            mins: [2],
            totalMin: 2
        },
        id038: { // 前二组选胆拖 : type7 // 胆码 + 拖码 : !hasTool : !重复
            tip: '从01-11中，选取2个及以上的号码进行投注，每注需至少包括1个胆码及1个拖码。',
            type: 4,
            titles: ['胆码', '拖码'],
            max: 1, // 最多胆码个数
            mins: [1, 1], // 单组至少个数
            totalMin: 2 // 所有组至少个数
        },
        id039: { // 后二直选 : type6 // 十位 + 个位 : hasTool : !重复
            tip: '从十位、个位中至少各选择1个号码组成一注。',
            type: 3,
            titles: ['十位', '个位'],
            mins: [1, 1],
            totalMin: 2
        },
        id040: { // 后二组选 : type8 // 后二组选 : hasTool : !重复
            tip: '从01-11中任意选择2个或2个以上号码组成一注。',
            type: 5,
            titles: ['后二组选'],
            mins: [2],
            totalMin: 2
        },
        id041: { // 后二组选胆拖 : type7 // 胆码 + 拖码 : !hasTool : !重复
            tip: '从01-11中，选取2个及以上的号码进行投注，每注需至少包括1个胆码及1个拖码。',
            type: 4,
            titles: ['胆码', '拖码'],
            max: 1, // 最多胆码个数
            mins: [1, 1], // 单组至少个数
            totalMin: 2 // 所有组至少个数
        }
    },
    t3: { // 三码：
        id042: { // 前三直选 : type2 // 万位 + 千位 + 百位 : hasTool : !重复
            tip: '从万位、千位、百位中至少各选择1个号码组成一注。',
            type: 2,
            titles: ['万位', '千位', '百位'],
            mins: [1, 1, 1],
            totalMin: 3
        },
        id043: { // 前三组选 : type8 // 前三组选 : hasTool : !重复
            tip: '从01-11中任意选择3个或3个以上号码组成一注。',
            type: 5,
            titles: ['前三组选'],
            mins: [3],
            totalMin: 3
        },
        id044: { // 前三组选胆拖 : type7 // 胆码 + 拖码 : !hasTool : !重复
            tip: '从01-11中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及2个拖码。',
            type: 4,
            titles: ['胆码', '拖码'],
            max: 2,
            mins: [1, 1],
            totalMin: 3
        },
        id045: { // 中三直选 : type3 // 千位 + 百位 + 十位 : hasTool : !重复
            tip: '从千位、百位、十位中至少各选择1个号码组成一注。',
            type: 2,
            titles: ['千位', '百位', '十位'],
            mins: [1, 1, 1],
            totalMin: 3
        },
        id046: { // 中三组选 : type8 // 中三组选 : hasTool : !重复
            tip: '从01-11中任意选择3个或3个以上号码组成一注。',
            type: 5,
            titles: ['中三组选'],
            mins: [3],
            totalMin: 3
        },
        id047: { // 中三组选胆拖 : type7 // 胆码 + 拖码 : !hasTool : !重复
            tip: '从01-11中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及2个拖码。',
            type: 4,
            titles: ['胆码', '拖码'],
            max: 2,
            mins: [1, 1],
            totalMin: 3
        },
        id048: { // 后三直选 : type4 // 百位 + 十位 + 个位 : hasTool : !重复
            tip: '从百位、十位、个位中至少各选择1个号码组成一注。',
            type: 2,
            titles: ['百位', '十位', '个位'],
            mins: [1, 1, 1],
            totalMin: 3
        },
        id049: { // 后三组选 : type8 // 后三组选 : hasTool : !重复
            tip: '从01-11中任意选择3个或3个以上号码组成一注。',
            type: 5,
            titles: ['后三组选'],
            mins: [3],
            totalMin: 3
        },
        id050: { // 后三组选胆拖 ： type7 // 胆码 + 拖码 : !hasTool : !重复
            tip: '从01-11中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及2个拖码。',
            type: 4,
            titles: ['胆码', '拖码'],
            max: 2,
            mins: [1, 1],
            totalMin: 3
        }
    },
    t4: { // 定位胆
        id051: { // 定位胆 : type1 // 万位 + 千位 + 百位 + 十位 + 个位 : hasTool : 重复
            tip: '从万位、千位、百位、十位、个任意位置上任意选择1个或1个以上号码。',
            type: 1,
            titles: ['万位', '千位', '百位', '十位', '个位'],
            mins: [0, 0, 0, 0, 0],
            totalMin: 1
        }
    },
    t5: { // 不定位
        id052: { // 前三 ： type8 // 不定位 : hasTool : !重复
            tip: '从01-11中任意选择1个以上号码。',
            type: 5,
            titles: ['不定位'],
            mins: [1],
            totalMin: 1
        },
        id053: { // 中三 ： type8 // 不定位 : hasTool : !重复
            tip: '从01-11中任意选择1个以上号码。',
            type: 5,
            titles: ['不定位'],
            mins: [1],
            totalMin: 1
        },
        id054: { // 后三 ： type8 // 不定位 : hasTool : !重复
            tip: '从01-11中任意选择1个以上号码。',
            type: 5,
            titles: ['不定位'],
            mins: [1],
            totalMin: 1
        }
    },
    t6: { // 任选
        id055: { // 一中一 ： type8 // 一中一 : hasTool : !重复
            tip: '从01-11中任意选择1个或1个以上号码。',
            type: 5,
            titles: ['一中一'],
            mins: [1],
            totalMin: 1
        },
        id056: { // 二中二 ： type8 // 二中二 : hasTool : !重复
            tip: '从01-11中任意选择2个或2个以上号码。',
            type: 5,
            titles: ['二中二'],
            mins: [2],
            totalMin: 2
        },
        id057: { // 三中三 ： type8 // 三中三 : hasTool : !重复
            tip: '从01-11中任意选择3个或3个以上号码。',
            type: 5,
            titles: ['三中三'],
            mins: [3],
            totalMin: 3
        },
        id058: { // 四中四 ： type8 // 四中四 : hasTool : !重复
            tip: '从01-11中任意选择4个或4个以上号码。',
            type: 5,
            titles: ['四中四'],
            mins: [4],
            totalMin: 4
        },
        id059: { // 五中五 ： type8 // 五中五 : hasTool : !重复
            tip: '从01-11中任意选择5个或5个以上号码。',
            type: 5,
            titles: ['五中五'],
            mins: [5],
            totalMin: 5
        },
        id060: { // 六中五 ： type8 // 六中五 : hasTool : !重复
            tip: '从01-11中任意选择6个或6个以上号码。',
            type: 5,
            titles: ['六中五'],
            mins: [6],
            totalMin: 6
        },
        id061: { // 七中五 ： type8 // 七中五 : hasTool : !重复
            tip: '从01-11中任意选择7个或7个以上号码。',
            type: 5,
            titles: ['七中五'],
            mins: [7],
            totalMin: 7
        },
        id062: { // 八中五 ： type8 // 八中五 : hasTool : !重复
            tip: '从01-11中任意选择8个或8个以上号码。',
            type: 5,
            titles: ['八中五'],
            mins: [8],
            totalMin: 8
        }
    },
    t7: { // 任选胆拖
        id063: { // 胆拖二中二 ： type7 // 胆码 + 拖码 : !hasTool : !重复
            tip: '从01-11中，选取2个及以上的号码进行投注，每注需至少包括1个胆码及1个拖码。',
            type: 4,
            titles: ['胆码', '拖码'],
            max: 1,
            mins: [1, 1],
            totalMin: 2
        },
        id064: { // 胆拖三中三 ： type7 // 胆码 + 拖码 : !hasTool : !重复
            tip: '从01-11中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及2个拖码。',
            type: 4,
            titles: ['胆码', '拖码'],
            max: 2,
            mins: [1, 1],
            totalMin: 3
        },
        id065: { // 胆拖四中四 ： type7 // 胆码 + 拖码 : !hasTool : !重复
            tip: '从01-11中，选取4个及以上的号码进行投注，每注需至少包括1个胆码及3个拖码。',
            type: 4,
            titles: ['胆码', '拖码'],
            max: 3,
            mins: [1, 1],
            totalMin: 4
        },
        id066: { // 胆拖五中五 ： type7 // 胆码 + 拖码 : !hasTool : !重复
            tip: '从01-11中，选取5个及以上的号码进行投注，每注需至少包括1个胆码及4个拖码。',
            type: 4,
            titles: ['胆码', '拖码'],
            max: 4,
            mins: [1, 1],
            totalMin: 5
        },
        id067: { // 胆拖六中五 ： type7 // 胆码 + 拖码 : !hasTool : !重复
            tip: '从01-11中，选取6个及以上的号码进行投注，每注需至少包括1个胆码及5个拖码。',
            type: 4,
            titles: ['胆码', '拖码'],
            max: 5,
            mins: [1, 1],
            totalMin: 6
        },
        id068: { // 胆拖七中五 ： type7 // 胆码 + 拖码 : !hasTool : !重复
            tip: '从01-11中，选取7个及以上的号码进行投注，每注需至少包括1个胆码及6个拖码。',
            type: 4,
            titles: ['胆码', '拖码'],
            max: 6,
            mins: [1, 1],
            totalMin: 7
        },
        id069: { // 胆拖八中五 ： type7 // 胆码 + 拖码 : !hasTool : !重复
            tip: '从01-11中，选取8个及以上的号码进行投注，每注需至少包括1个胆码及7个拖码。',
            type: 4,
            titles: ['胆码', '拖码'],
            max: 7,
            mins: [1, 1],
            totalMin: 8
        }
    }
};