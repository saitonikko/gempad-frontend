import { gql } from "@apollo/client";

export const CREATE_LOCK_LIST = gql`
    mutation createLockList($tokenAddress: String!, $isLpToken: Boolean!, $name: String!, $symbol: String!, $decimals: Int!, $owner: String!, $lockId: Int!, $amount: Float!, $lockTime: Float!, $unlockTime: Float!) {
        createLock(tokenAddress: $tokenAddress, isLpToken: $isLpToken, name: $name, symbol: $symbol, decimals: $decimals, owner: $owner) {
            message
        }
        createLockList(tokenAddress: $tokenAddress, lockId: $lockId, amount: $amount, lockTime: $lockTime, unlockTime: $unlockTime) {
            lockList {
                lockId
                amount
                lockTime
                unlockTime
                isUnlocked
                lock {
                    tokenAddress
                    amount
                }
            }
        }
    }
`

export const UPDATE_LOCK_LIST = gql`
    mutation updateLockList($lockId: Int!, $unlockTime: Float!) {
        updateLockList(lockId: $lockId, unlockTime: $unlockTime) {
            lockList {
                lockId
                amount
                lockTime
                unlockTime
                isUnlocked
                lock {
                    tokenAddress
                    amount
                }
            }
        }
    }
`

export const UNLOCK_LOCK_LIST = gql`
    mutation unlockLockList($lockId: Int!) {
        unlockLockList(lockId: $lockId) {
            lockList {
                lockId
                amount
                lockTime
                unlockTime
                isUnlocked
                lock {
                    tokenAddress
                    amount
                }
            }
        }
    }
`