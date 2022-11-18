import { gql } from "@apollo/client";

export const GET_ALL_PRESALES = gql`
    query getAllPresales {
        getAllPresales {
            saleTitle
            saleAddress
            owner
            liquidityPercent
            lockupTime
            softcap
            hardcap
            maxBuy
            minBuy
            startTime
            endTime
            estimatedListingTime
            presaleType
            soldAmount
            logoImg
            isCanceled
            isEnded
            isListed
        }
    }
`

export const GET_PRESALES_BY_OWNER = gql`
    query getPresalesByOwner($owner: String!) {
        getPresalesByOwner(owner: $owner) {
            saleTitle
            saleAddress
            owner
            liquidityPercent
            lockupTime
            softcap
            hardcap
            maxBuy
            minBuy
            startTime
            endTime
            estimatedListingTime
            presaleType
            soldAmount
            logoImg
            isCanceled
            isEnded
            isListed
        }
    }
`

export const GET_PRESALE_BY_ADDRESS = gql`
    query getPresaleByAddress($presaleAddress: String!) {
        getPresaleByAddress(presaleAddress: $presaleAddress) {
            saleTitle
            saleAddress
            owner
            tokenAddress
            tokenName
            tokenSymbol
            tokenDecimals
            totalSupply
            presaleRate
            listingRate
            liquidityPercent
            lockupTime
            softcap
            hardcap
            maxBuy
            minBuy
            startTime
            endTime
            estimatedListingTime
            refundType
            presaleType
            isTeamVesting
            teamVestingTokens
            teamFirstPeriod
            teamFirstPercent
            teamCycleAmount
            teamCyclePeriod
            isVesting
            firstRelease
            vestingCyclePeriod
            vestingCycleAmount
            needAmount
            soldAmount
            logoImg
            bannerImg
            website
            facebook
            twitter
            github
            telegram
            discord
            reddit
            youtube
            description
            isCanceled
            isEnded
            isListed
            whitelist {
                listedAddress
            }
        }
    }
`