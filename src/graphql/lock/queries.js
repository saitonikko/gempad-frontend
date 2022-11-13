import { gql } from "@apollo/client";

export const GET_ALL_LOCKS = gql`
    query getAllLocks($isLpToken: Boolean!) {
        getAllLocks(isLpToken: $isLpToken) {
            tokenAddress
            name
            symbol
            owner
            amount
        }
    }
`

export const GET_MY_LOCKS = gql`
    query getMyLocks($owner: String!, $isLpToken: Boolean!) {
        getMyLocks(owner: $owner, isLpToken: $isLpToken) {
            tokenAddress
            name
            symbol
            owner
            amount
        }
    }
`

export const GET_LOCK_LISTS = gql`
    query getLockLists($tokenAddress: String!) {
        getLockLists(tokenAddress: $tokenAddress) {
            tokenAddress
            name
            symbol
            decimals
            owner
            amount
            lockList {
                lockId
                amount
                lockTime
                unlockTime
                isUnlocked
            }
        }
    }
`