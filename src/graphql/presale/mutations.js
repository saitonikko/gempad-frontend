import { gql } from "@apollo/client";

export const CREATE_PRESALE = gql`
    mutation createPresale($saleTitle: String!, $saleAddress: String!, $owner: String!, $tokenAddress: String!, $tokenName: String!, $tokenSymbol: String!, $tokenDecimals: Int!, $totalSupply: Float!, $presaleRate: Float!, $listingRate: Float!, $liquidityPercent: Float!, $lockupTime: Int!, $softcap: Float!, $hardcap: Float!, $maxBuy: Float!, $minBuy: Float!, $startTime: Float!, $endTime: Float!, $estimatedListingTime: Float!, $refundType: String!, $presaleType: String!, $isTeamVesting: Boolean!, $teamVestingTokens: Float, $teamFirstPeriod: Int, $teamFirstPercent: Float, $teamCyclePeriod: Int, $teamCycleAmount: Float, $isVesting: Boolean!, $firstRelease: Float, $vestingCyclePeriod: Int, $vestingCycleAmount: Float, $needAmount: Float!, $logoImg: String!, $bannerImg: String!, $website: String!, $facebook: String, $twitter: String, $github: String, $telegram: String, $discord: String, $reddit: String, $youtube: String, $description: String!) {
        createPresale(saleTitle: $saleTitle, saleAddress: $saleAddress, owner: $owner, tokenAddress: $tokenAddress, tokenName: $tokenName, tokenSymbol: $tokenSymbol, tokenDecimals: $tokenDecimals, totalSupply: $totalSupply, presaleRate: $presaleRate, listingRate: $listingRate, liquidityPercent: $liquidityPercent, lockupTime: $lockupTime, softcap: $softcap, hardcap: $hardcap, maxBuy: $maxBuy, minBuy: $minBuy, startTime: $startTime, endTime: $endTime, estimatedListingTime: $estimatedListingTime, refundType: $refundType, presaleType: $presaleType, isTeamVesting: $isTeamVesting, teamVestingTokens: $teamVestingTokens, teamFirstPeriod: $teamFirstPeriod, teamFirstPercent: $teamFirstPercent, teamCyclePeriod: $teamCyclePeriod, teamCycleAmount: $teamCycleAmount, isVesting: $isVesting, firstRelease: $firstRelease, vestingCyclePeriod: $vestingCyclePeriod, vestingCycleAmount: $vestingCycleAmount, needAmount: $needAmount, logoImg: $logoImg, bannerImg: $bannerImg, website: $website, facebook: $facebook, twitter: $twitter, github: $github, telegram: $telegram, discord: $discord, reddit: $reddit, youtube: $youtube, description: $description) {
            presale {
                saleTitle
                saleAddress
            }
        }
    }
`

export const ADD_WHITELIST = gql`
    mutation addWhitelist($saleAddress: String!, $listedAddresses: [String]!) {
        addWhitelist(saleAddress: $saleAddress, listedAddresses: $listedAddresses) {
            message
        }
    }
`

export const CANCEL_PRESALE = gql`
    mutation cancelPresale($saleAddress: String!) {
        cancelPresale(saleAddress: $saleAddress) {
            message
        }
    }
`

export const FINALIZE_PRESALE = gql`
    mutation finalizePresale($saleAddress: String!) {
        finalizePresale(saleAddress: $saleAddress) {
            message
        }
    }
`

export const LIST_PRESALE = gql`
    mutation listPresale($saleAddress: String!) {
        listPresale(saleAddress: $saleAddress) {
            message
        }
    }
`

export const UPDATE_SOLD_AMOUNT = gql`
    mutation updateSoldAmount($saleAddress: String!, $soldAmount: Float!) {
        updateSoldAmount(saleAddress: $saleAddress, soldAmount: $soldAmount) {
            message
        }
    }
`

// export const CREATE_LOCK_LIST = gql`
//     mutation createLockList($tokenAddress: String!, $isLpToken: Boolean!, $name: String!, $symbol: String!, $decimals: Int!, $owner: String!, $lockId: Int!, $amount: Float!, $lockTime: Float!, $unlockTime: Float!) {
//         createLock(tokenAddress: $tokenAddress, isLpToken: $isLpToken, name: $name, symbol: $symbol, decimals: $decimals, owner: $owner) {
//             message
//         }
//         createLockList(tokenAddress: $tokenAddress, lockId: $lockId, amount: $amount, lockTime: $lockTime, unlockTime: $unlockTime) {
//             lockList {
//                 lockId
//                 amount
//                 lockTime
//                 unlockTime
//                 isUnlocked
//                 lock {
//                     tokenAddress
//                     amount
//                 }
//             }
//         }
//     }
// `

// export const UPDATE_LOCK_LIST = gql`
//     mutation updateLockList($lockId: Int!, $unlockTime: Float!) {
//         updateLockList(lockId: $lockId, unlockTime: $unlockTime) {
//             lockList {
//                 lockId
//                 amount
//                 lockTime
//                 unlockTime
//                 isUnlocked
//                 lock {
//                     tokenAddress
//                     amount
//                 }
//             }
//         }
//     }
// `

// export const UNLOCK_LOCK_LIST = gql`
//     mutation unlockLockList($lockId: Int!) {
//         unlockLockList(lockId: $lockId) {
//             lockList {
//                 lockId
//                 amount
//                 lockTime
//                 unlockTime
//                 isUnlocked
//                 lock {
//                     tokenAddress
//                     amount
//                 }
//             }
//         }
//     }
// `