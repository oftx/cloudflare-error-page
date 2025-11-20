export const errorPresets = [
    {
        id: 'internal-server-error',
        type: 'error',
        params: {
            title: 'Internal server error',
            error_code: 500,
            domain: null,
            time: null,
            ray_id: null,
            client_ip: '127.0.0.1',
            more_information: {
                hidden: false,
                text: "cloudflare.com",
                link: "https://www.cloudflare.com",
            },
            browser_status: {
                status: 'ok',
                status_text: 'Working',
                location: 'You',
                name: 'Browser',
            },
            cloudflare_status: {
                status: 'error',
                status_text: 'Error',
                location: 'London',
                name: 'Cloudflare',
            },
            host_status: {
                status: 'ok',
                status_text: 'Working',
                name: 'Host',
            },
            error_source: 'cloudflare',
            what_happened: '<p>There is an internal server error on Cloudflare\'s network.</p>',
            what_can_i_do: '<p>Please try again in a few minutes.</p>',
            perf_sec_by: {
                text: "Cloudflare",
                link: "https://www.cloudflare.com",
            },
        }
    },
    {
        id: 'catastrophic-failure',
        type: 'error',
        params: {
            title: 'Catastrophic infrastructure failure',
            error_code: 503,
            more_information: {
                text: "cloudflare.com",
                link: "https://youtube.com/watch?v=dQw4w9WgXcQ",
            },
            browser_status: { status: 'error', status_text: 'Out of Memory', location: 'Your Device', name: 'Browser' },
            cloudflare_status: { status: 'error', location: 'Global Network', status_text: 'Critical Failure', name: 'Cloudflare' },
            host_status: { status: 'error', location: 'Origin Server', status_text: 'On Fire', name: 'Host' },
            error_source: 'cloudflare',
            what_happened: '<p>There is a catastrophic failure.</p>',
            what_can_i_do: '<p>Please try again in a few years.</p>',
            perf_sec_by: {
                text: "Cloudflare",
                link: "https://youtube.com/watch?v=dQw4w9WgXcQ",
            },
        }
    },
    {
        id: 'access-denied',
        type: 'error',
        params: {
            title: 'Access Denied',
            error_code: 403,
            more_information: { hidden: true },
            browser_status: { status: 'ok', status_text: 'Authenticated', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'Working', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Forbidden', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>You do not have permission to access this resource.</p>',
            what_can_i_do: '<p>Contact the site administrator if you believe this is a mistake.</p>',
        }
    },
    {
        id: 'connection-timed-out',
        type: 'error',
        params: {
            title: 'Connection Timed Out',
            error_code: 522,
            more_information: { hidden: false, text: "Learn more", link: "#" },
            browser_status: { status: 'ok', status_text: 'Working', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'Working', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Unreachable', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>The initial connection between Cloudflare\'s network and the origin web server timed out.</p>',
            what_can_i_do: '<p>Please try again in a few minutes.</p>',
        }
    }
];

export const successPreset = {
    id: 'success-easter-egg',
    type: 'success',
    params: {
        title: 'Welcome!',
        error_code: 200,
    }
};

export const allPresets = [...errorPresets, successPreset];
