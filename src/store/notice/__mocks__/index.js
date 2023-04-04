import Vue from "vue"
import Vuex from "vuex"


Vue.use(Vuex)

export const getters = {
    getNotices: jest.fn().mockReturnValue([
        {
            noticeId: 1,
            title: 'go',
            content: 'go',
            writer: 'go',
            regDate: new Date(),
        },
        {
            noticeId: 2,
            title: 'go',
            content: 'go',
            writer: 'go',
            regDate: new Date(),
        },
        {
            noticeId: 3,
            title: 'go',
            content: 'go',
            writer: 'go',
            regDate: new Date(),
        },
    ]),

    getNotice: jest.fn().mockReturnValue([
        {
            noticeId: 1,
            title: 'go',
            content: 'go',
            writer: 'go',
            regDate: new Date(),
        },
    ]),
}

export const mutations = {
    fetch: jest.fn(),
}

export const actions = {
    requestNoticeListToSpring: jest.fn((payload) => {
        const { title, writer, content, files } = payload

        let notice = new Object()
        notice.id = 1
        notice.title = "go"
        notice.writer = "go"
        notice.regDate = new Date('2023-04-01')

        return product
    }),
}

export const state = {
    notices: [
        {
            noticeId: 1,
            title: 'go',
            content: 'go',
            writer: 'go',
            regDate: new Date(),
        },
        {
            noticeId: 2,
            title: 'go',
            content: 'go',
            writer: 'go',
            regDate: new Date(),
        },
        {
            noticeId: 3,
            title: 'go',
            content: 'go',
            writer: 'go',
            regDate: new Date(),
        },
    ],

    notice: {
        noticeId: 1,
        title: 'go',
        content: 'go',
        writer: 'go',
        regDate: new Date(),
    },
}

export function __createMocks(custom = { getters: {}, mutations: {}, actions: {}, state: {}}) {
    const mockGetters = Object.assign({}, getters, custom.getters)
    const mockMutations = Object.assign({}, mutations, custom.mutations)
    const mockActions = Object.assign({}, actions, custom.actions)
    const mockState = Object.assign({}, state, custom.state)

    return {
        getters: mockGetters,
        mutations: mockMutations,
        actions: mockActions,
        state: mockState,
        store: new Vuex.Store({
            getters: mockGetters,
            mutations: mockMutations,
            actions: mockActions,
            state: mockState,
        }),
    }
}

export const store = __createMocks().store;