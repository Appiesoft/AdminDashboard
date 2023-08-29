import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { groupCreateApi, groupDeleteApi, groupsApi, groupUpdateApi } from './api';
import GroupsActionTypes from './constant';

// start list
function* groupsList() {
    try {
        yield put({
            type: GroupsActionTypes.GROUPS_LIST_LOADING,
            payload: {},
        });
        const response = yield call(groupsApi, {});
        if (response.data.status) {
            yield put({
                type: GroupsActionTypes.GROUPS_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: GroupsActionTypes.GROUPS_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: GroupsActionTypes.GROUPS_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}

// start create
function* createGroup({ payload: { groupName, groupPermission, groupStatus } }) {
    try {
        yield put({
            type: GroupsActionTypes.GROUPS_CREATE_LOADING,
            payload: {},
        });
        const response = yield call(groupCreateApi, {
            group_name: groupName,
            group_permission: groupPermission,
            group_status: groupStatus,
        });
        if (response.data.status) {
            yield put({
                type: GroupsActionTypes.GROUPS_CREATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: GroupsActionTypes.GROUPS_CREATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: GroupsActionTypes.GROUPS_CREATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: GroupsActionTypes.GROUPS_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}

// start update
function* updateGroup({ payload: { groupId, groupName, groupPermission, groupStatus } }) {
    try {
        yield put({
            type: GroupsActionTypes.GROUPS_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(groupUpdateApi, {
            group_id: groupId,
            group_name: groupName,
            group_permission: groupPermission,
            group_status: groupStatus,
        });
        if (response.data.status) {

            yield put({
                type: GroupsActionTypes.GROUPS_UPDATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: GroupsActionTypes.GROUPS_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: GroupsActionTypes.GROUPS_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: GroupsActionTypes.GROUPS_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// start delete
function* deleteGroup({ payload: { groupsId } }) {
    try {
        yield put({
            type: GroupsActionTypes.GROUPS_DELETE_LOADING,
            payload: {},
        });
        const response = yield call(groupDeleteApi, {
            groupsId: groupsId,
        });
        if (response.data.status) {
            yield put({
                type: GroupsActionTypes.GROUPS_DELETE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: GroupsActionTypes.GROUPS_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: GroupsActionTypes.GROUPS_DELETE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: GroupsActionTypes.GROUPS_DELETE_ERROR,
            payload: { message: error.message },
        });
    }
}

export function* getGroupsList(): any {
    yield takeEvery(GroupsActionTypes.GET_GROUPS_LIST, groupsList);
}

export function* groupsCreate(): any {
    yield takeEvery(GroupsActionTypes.GROUPS_CREATE, createGroup);
}
export function* groupsUpdate(): any {
    yield takeEvery(GroupsActionTypes.GROUPS_UPDATE, updateGroup);
}
export function* groupsDelete(): any {
    yield takeEvery(GroupsActionTypes.GROUPS_DELETE, deleteGroup);
}

function* groupsSaga(): any {
    yield all([fork(getGroupsList)]);
    yield all([fork(groupsCreate)]);
    yield all([fork(groupsUpdate)]);
    yield all([fork(groupsDelete)]);
}

export default groupsSaga;
