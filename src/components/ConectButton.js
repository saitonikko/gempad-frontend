import { ConnectButton } from '@rainbow-me/rainbowkit';


export const ConnectWallet = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');
                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button className="connect-btn" onClick={openConnectModal} type="button">
                                        Connect
                                    </button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <button className="connect-btn" onClick={openChainModal} type="button">
                                        NOT SUPPORTED
                                    </button>
                                );
                            }
                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button
                                        className="connect-btn"
                                        onClick={openChainModal}
                                        type="button"
                                    >
                                        {chain.hasIcon && (
                                            <div className="icon-container" style={{ background: chain.iconBackground }}>
                                                {chain.iconUrl &&
                                                    <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} />
                                                }
                                            </div>
                                        )}
                                        {chain.name}
                                    </button>
                                    <button className="connect-btn" onClick={openAccountModal} type="button">
                                        {account.displayName}
                                        {/* {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ''} */}
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};