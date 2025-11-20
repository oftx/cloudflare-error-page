import React, { useState } from 'react';
import '../styles/main.css';

const ErrorPage = ({ params = {} }) => {
    const [showIp, setShowIp] = useState(false);
    const [showCat, setShowCat] = useState(false);

    const errorCode = params.error_code || 500;
    const title = params.title || 'Internal server error';

    const time = params.time || new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
    const rayId = params.ray_id || crypto.randomUUID().replace(/-/g, '').slice(0, 16);
    const clientIp = params.client_ip || '1.1.1.1';

    // Custom domain support - defaults to current hostname if not provided
    const customDomain = params.domain || (typeof window !== 'undefined' ? window.location.hostname : 'example.com');

    // Page title format: <domain> | <errorCode>: <title>
    const htmlTitle = params.html_title || `${customDomain} | ${errorCode}: ${title}`;

    // Set document title
    React.useEffect(() => {
        document.title = htmlTitle;
    }, [htmlTitle]);

    const moreInfo = params.more_information || {};
    const perfSecBy = params.perf_sec_by || {};

    const items = ['browser', 'cloudflare', 'host'];

    return (
        <div id="cf-wrapper">
            {showCat && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                        cursor: 'pointer'
                    }}
                    onClick={() => setShowCat(false)}
                >
                    <img
                        src={`https://httpcats.com/${errorCode}.jpg`}
                        alt={`Error ${errorCode}`}
                        style={{ maxWidth: '90%', maxHeight: '90%', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                    />
                </div>
            )}
            <div id="cf-error-details" className="p-0">
                <header className="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
                    <h1 className="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                        <span className="inline-block" style={{ marginRight: '10px' }}>{title}</span>
                        <span
                            className="code-label"
                            onClick={() => setShowCat(true)}
                            style={{ cursor: 'pointer' }}
                            title="Click for a surprise"
                        >
                            Error code {errorCode}
                        </span>
                    </h1>
                    {(!moreInfo.hidden) && (
                        <div>
                            Visit <a href={moreInfo.link || 'https://www.cloudflare.com/'} target="_blank" rel="noopener noreferrer">{moreInfo.text || 'cloudflare.com'}</a> for more information.
                        </div>
                    )}
                    <div className="mt-3">{time}</div>
                </header>

                <div className="my-8 bg-gradient-gray">
                    <div className="w-240 lg:w-full mx-auto">
                        <div className="clearfix md:px-8">
                            {items.map((itemId) => {
                                let icon = 'server';
                                let defaultLocation = customDomain;
                                let defaultName = 'Host';

                                if (itemId === 'browser') {
                                    icon = 'browser';
                                    defaultLocation = 'You';
                                } else if (itemId === 'cloudflare') {
                                    icon = 'cloud';
                                    defaultLocation = 'San Francisco';
                                    defaultName = 'Cloudflare';
                                }

                                const item = params[`${itemId}_status`] || {};
                                const status = item.status || 'ok';

                                let textColor = item.status_text_color;
                                if (!textColor) {
                                    if (status === 'ok') textColor = '#9bca3e';
                                    else if (status === 'error') textColor = '#bd2426';
                                }

                                const statusText = item.status_text || (status === 'ok' ? 'Working' : 'Error');
                                const isSource = params.error_source === itemId;

                                return (
                                    <div key={itemId} id={`cf-${itemId}-status`} className={`${isSource ? 'cf-error-source' : ''} relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center`}>
                                        <div className="relative mb-10 md:m-0">
                                            <span className={`cf-icon-${icon} block md:hidden h-20 bg-center bg-no-repeat`}></span>
                                            <span className={`cf-icon-${status} w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4`}></span>
                                        </div>
                                        <span className="md:block w-full truncate">{item.location || defaultLocation}</span>
                                        <h3 className="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">{item.name || defaultName}</h3>
                                        {' '}
                                        <span className="leading-1.3 text-2xl" style={{ color: textColor }}>{statusText}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="w-240 lg:w-full mx-auto mb-8 lg:px-8">
                    <div className="clearfix">
                        <div className="w-1/2 md:w-full float-left pr-6 md:pb-10 md:pr-0 leading-relaxed">
                            <h2 className="text-3xl font-normal leading-1.3 mb-4">What happened?</h2>
                            <div dangerouslySetInnerHTML={{ __html: params.what_happened || '<p>There is an internal server error on Cloudflare\'s network.</p>' }} />
                        </div>
                        <div className="w-1/2 md:w-full float-left leading-relaxed">
                            <h2 className="text-3xl font-normal leading-1.3 mb-4">What can I do?</h2>
                            <div dangerouslySetInnerHTML={{ __html: params.what_can_i_do || '<p>Please try again in a few minutes.</p>' }} />
                        </div>
                    </div>
                </div>

                <div className="cf-error-footer cf-wrapper w-240 lg:w-full py-10 sm:py-4 sm:px-8 mx-auto text-center sm:text-left border-solid border-0 border-t border-gray-300">
                    <p className="text-13">
                        <span className="cf-footer-item sm:block sm:mb-1">Cloudflare Ray ID: <strong className="font-semibold">{rayId}</strong></span>
                        <span className="cf-footer-separator sm:hidden"> &bull; </span>
                        <span id="cf-footer-item-ip" className="cf-footer-item sm:block sm:mb-1">
                            Your IP:{' '}
                            {!showIp ? (
                                <button type="button" id="cf-footer-ip-reveal" className="cf-footer-ip-reveal-btn" onClick={() => setShowIp(true)}>Click to reveal</button>
                            ) : (
                                <span id="cf-footer-ip">{clientIp}</span>
                            )}
                            <span className="cf-footer-separator sm:hidden"> &bull; </span>
                        </span>
                        <span className="cf-footer-item sm:block sm:mb-1"><span>Performance &amp; security by</span> <a rel="noopener noreferrer" href={perfSecBy.link || 'https://www.cloudflare.com/'} id="brand_link" target="_blank">{perfSecBy.text || 'Cloudflare'}</a></span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
