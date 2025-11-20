


const createPreset = (code, title, description, action, type = 'error', source = 'host', category = 'standard') => {
    const browserStatus = (type === 'error' && source === 'browser')
        ? { status: 'error', status_text: 'Error', location: 'You', name: 'Browser' }
        : { status: 'ok', status_text: 'Working', location: 'You', name: 'Browser' };

    const cloudflareStatus = (type === 'error' && source === 'cloudflare')
        ? { status: 'error', status_text: 'Error', location: 'Cloud', name: 'Cloudflare' }
        : { status: 'ok', status_text: 'Working', location: 'Cloud', name: 'Cloudflare' };

    const hostStatus = (type === 'error' && source === 'host')
        ? { status: 'error', status_text: 'Error', name: 'Host' }
        : { status: 'ok', status_text: 'Working', name: 'Host' };

    return {
        id: `${code}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        type,
        category,
        params: {
            title,
            error_code: code,
            domain: null,
            time: null,
            ray_id: null,
            client_ip: '127.0.0.1',
            more_information: { hidden: false, text: "Learn more", link: `https://httpcats.com/${code}` },
            browser_status: browserStatus,
            cloudflare_status: cloudflareStatus,
            host_status: hostStatus,
            error_source: source,
            what_happened: `<p>${description}</p>`,
            what_can_i_do: `<p>${action}</p>`,
            perf_sec_by: { text: "Cloudflare", link: "https://www.cloudflare.com" },
        }
    };
};




// Creative presets with custom status texts
const creativePresets = [
    {
        id: '404-existential-crisis',
        type: 'error',
        category: 'creative',
        params: {
            title: 'Page Not Found',
            error_code: 404,
            browser_status: { status: 'ok', status_text: 'Confused', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'Also Confused', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Missing', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>The page you are looking for went on vacation and never came back.</p>',
            what_can_i_do: '<p>Try therapy. Or a different URL.</p>',
        }
    },
    {
        id: '500-monday-morning',
        type: 'error',
        category: 'creative',
        params: {
            title: 'Internal Server Error',
            error_code: 500,
            browser_status: { status: 'ok', status_text: 'Caffeinated', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'error', status_text: 'Needs Coffee', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Still Sleeping', name: 'Host' },
            error_source: 'cloudflare',
            what_happened: '<p>The server woke up on the wrong side of the datacenter.</p>',
            what_can_i_do: '<p>Maybe come back after its morning coffee?</p>',
        }
    },
    {
        id: '503-overworked',
        type: 'error',
        category: 'creative',
        params: {
            title: 'Service Unavailable',
            error_code: 503,
            browser_status: { status: 'ok', status_text: 'Patient', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'Standing By', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Burnt Out', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>The server is experiencing existential dread and needs a moment.</p>',
            what_can_i_do: '<p>Try again later. Or never. Your choice.</p>',
        }
    },
    {
        id: '418-tea-break',
        type: 'error',
        category: 'creative',
        params: {
            title: 'I\'m a teapot',
            error_code: 418,
            browser_status: { status: 'ok', status_text: 'Thirsty', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'Brewing', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Short & Stout', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>You asked a teapot to make coffee. Rude.</p>',
            what_can_i_do: '<p>Accept tea instead. It\'s better for you anyway.</p>',
        }
    },
    {
        id: '502-game-of-telephone',
        category: 'creative',
        type: 'error',
        params: {
            title: 'Bad Gateway',
            error_code: 502,
            browser_status: { status: 'ok', status_text: 'Waiting', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'error', status_text: 'Bad Middleman', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'ok', status_text: 'Unreachable', name: 'Host' },
            error_source: 'cloudflare',
            what_happened: '<p>The message got lost in translation.</p>',
            what_can_i_do: '<p>Play telephone with someone more reliable.</p>',
        }
    },
    {
        id: '429-popular',
        category: 'creative',
        type: 'error',
        params: {
            title: 'Too Many Requests',
            error_code: 429,
            browser_status: { status: 'ok', status_text: 'Enthusiastic', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'Overwhelmed', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Exhausted', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>You are clicking way too fast. Are you a robot?</p>',
            what_can_i_do: '<p>Slow down. Maybe go outside. Touch some grass.</p>',
        }
    },
    {
        id: '401-stranger-danger',
        category: 'creative',
        type: 'error',
        params: {
            title: 'Unauthorized',
            error_code: 401,
            browser_status: { status: 'ok', status_text: 'Optimistic', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'Suspicious', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Paranoid', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>We don\'t know you. And frankly, we don\'t want to.</p>',
            what_can_i_do: '<p>Show some ID. Or fake it convincingly.</p>',
        }
    },
    {
        id: '504-infinite-wait',
        category: 'creative',
        type: 'error',
        params: {
            title: 'Gateway Timeout',
            error_code: 504,
            browser_status: { status: 'ok', status_text: 'Still Here', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'error', status_text: 'Gave Up', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'In A Coma', name: 'Host' },
            error_source: 'cloudflare',
            what_happened: '<p>We waited. And waited. And waited. Eventually we just gave up.</p>',
            what_can_i_do: '<p>Wake the server. Loudly.</p>',
        }
    },
    {
        id: '403-no-means-no',
        category: 'creative',
        type: 'error',
        params: {
            title: 'Forbidden',
            error_code: 403,
            browser_status: { status: 'ok', status_text: 'Hopeful', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'Neutral', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Hostile', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>You lack the proper credentials. And the proper attitude.</p>',
            what_can_i_do: '<p>Bribe someone. Or just leave quietly.</p>',
        }
    },
    {
        id: '500-panic-mode',
        category: 'creative',
        type: 'error',
        params: {
            title: 'Internal Server Error',
            error_code: 500,
            browser_status: { status: 'ok', status_text: 'Concerned', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'error', status_text: 'Panicking', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'On Fire', name: 'Host' },
            error_source: 'cloudflare',
            what_happened: '<p>Everything is fine. This is fine. We are all fine.</p>',
            what_can_i_do: '<p>Pretend you didn\'t see this.</p>',
        }
    },
    {
        id: '200-barely',
        category: 'creative',
        type: 'error',
        params: {
            title: 'OK',
            error_code: 200,
            browser_status: { status: 'ok', status_text: 'Barely', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'Kinda', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'ok', status_text: 'Not Really', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>It works. Sort of. If you squint.</p>',
            what_can_i_do: '<p>Lower your expectations significantly.</p>',
        }
    },
    {
        id: '508-infinite-loop',
        category: 'creative',
        type: 'error',
        params: {
            title: 'Loop Detected',
            error_code: 508,
            browser_status: { status: 'ok', status_text: 'Dizzy', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'error', status_text: 'Going in Circles', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Stuck', name: 'Host' },
            error_source: 'cloudflare',
            what_happened: '<p>We got stuck in a loop. We got stuck in a loop. We got stuck in a loop.</p>',
            what_can_i_do: '<p>Break the cycle. Try Ctrl+C.</p>',
        }
    },
    {
        id: '404-amnesia',
        category: 'creative',
        type: 'error',
        params: {
            title: 'Not Found',
            error_code: 404,
            browser_status: { status: 'ok', status_text: 'Searching', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'Helping', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Forgetful', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>The server forgot where it put that page. Oops.</p>',
            what_can_i_do: '<p>Help us look for it. Check under the couch?</p>',
        }
    },
    {
        id: '503-apocalypse',
        category: 'creative',
        type: 'error',
        params: {
            title: 'Service Unavailable',
            error_code: 503,
            browser_status: { status: 'error', status_text: 'Terrified', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'error', status_text: 'Apocalypse', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Gone', name: 'Host' },
            error_source: 'cloudflare',
            what_happened: '<p>It\'s the end of the world as we know it.</p>',
            what_can_i_do: '<p>Stock up on canned goods and wait it out.</p>',
        }
    },
    {
        id: '420-chill',
        category: 'creative',
        type: 'error',
        params: {
            title: 'Enhance Your Calm',
            error_code: 420,
            browser_status: { status: 'ok', status_text: 'Zen', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'Mellow', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Super Chill', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>You\'re too stressed. The server is worried about you.</p>',
            what_can_i_do: '<p>Take a deep breath. Maybe do some yoga.</p>',
        }
    },
    {
        id: '503-total-meltdown',
        type: 'error',
        category: 'creative',
        params: {
            title: 'Total System Meltdown',
            error_code: 503,
            browser_status: { status: 'error', status_text: 'Crashed', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'error', status_text: 'Melting', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Dead', name: 'Host' },
            error_source: 'cloudflare',
            what_happened: '<p>Everything. Absolutely everything went wrong.</p>',
            what_can_i_do: '<p>Pray. Or reboot the universe.</p>',
        }
    },
    {
        id: '500-dumpster-fire',
        type: 'error',
        category: 'creative',
        params: {
            title: 'Dumpster Fire',
            error_code: 500,
            browser_status: { status: 'error', status_text: 'Smoking', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'error', status_text: 'Burning', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Ashes', name: 'Host' },
            error_source: 'cloudflare',
            what_happened: '<p>This is what we call a "dumpster fire" in the industry.</p>',
            what_can_i_do: '<p>Grab marshmallows and watch it burn.</p>',
        }
    },
    {
        id: '418-identity-crisis',
        type: 'error',
        category: 'creative',
        params: {
            title: 'I\'m a Teapot (Identity Crisis)',
            error_code: 418,
            browser_status: { status: 'ok', status_text: 'Confused', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'Mediating', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Existential Dread', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>The server is having an identity crisis. It thinks it\'s a teapot.</p>',
            what_can_i_do: '<p>Convince it that being a server is cool too.</p>',
        }
    },
    {
        id: '404-void',
        type: 'error',
        category: 'creative',
        params: {
            title: 'Lost in the Void',
            error_code: 404,
            browser_status: { status: 'ok', status_text: 'Looking', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'No Clue', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Vanished', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>Your page fell into the void. It\'s gone. Forever.</p>',
            what_can_i_do: '<p>Accept the void. Become one with it.</p>',
        }
    },
    {
        id: '502-miscommunication',
        type: 'error',
        category: 'creative',
        params: {
            title: 'Total Miscommunication',
            error_code: 502,
            browser_status: { status: 'ok', status_text: 'Said Hello', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'error', status_text: 'Translating Badly', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'ok', status_text: 'Heard Gibberish', name: 'Host' },
            error_source: 'cloudflare',
            what_happened: '<p>Lost in translation. Cloudflare is a terrible interpreter.</p>',
            what_can_i_do: '<p>Try sign language. Or morse code.</p>',
        }
    },
    {
        id: '429-ddos-yourself',
        type: 'error',
        category: 'creative',
        params: {
            title: 'You DDoS\'d Yourself',
            error_code: 429,
            browser_status: { status: 'error', status_text: 'Spamming', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'Blocking You', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Overwhelmed', name: 'Host' },
            error_source: 'browser',
            what_happened: '<p>Congratulations! You just DDoS\'d yourself.</p>',
            what_can_i_do: '<p>Stop. Clicking. So. Fast.</p>',
        }
    },
    {
        id: '511-password-123456',
        type: 'error',
        category: 'creative',
        params: {
            title: 'Network Authentication Required',
            error_code: 511,
            browser_status: { status: 'ok', status_text: 'Trying Password', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'error', status_text: 'Rejecting 123456', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'ok', status_text: 'Waiting', name: 'Host' },
            error_source: 'cloudflare',
            what_happened: '<p>Your password is probably "password" isn\'t it?</p>',
            what_can_i_do: '<p>Try a stronger password. Like "Password1".</p>',
        }
    },
    {
        id: '404-internet-broke',
        type: 'error',
        category: 'creative',
        params: {
            title: 'The Internet Is Broken',
            error_code: 404,
            browser_status: { status: 'error', status_text: 'Disconnected', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'error', status_text: 'Cloud Offline', location: '???', name: 'Cloudflare' },
            host_status: { status: 'error', status_text: 'Not Found', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>We broke the internet. Sorry.</p>',
            what_can_i_do: '<p>Turn it off and back on again.</p>',
        }
    },
    {
        id: '200-imposter',
        type: 'error',
        category: 'creative',
        params: {
            title: 'Sus',
            error_code: 200,
            browser_status: { status: 'ok', status_text: 'Suspicious', location: 'You', name: 'Browser' },
            cloudflare_status: { status: 'ok', status_text: 'Kinda Sus', location: 'Cloud', name: 'Cloudflare' },
            host_status: { status: 'ok', status_text: 'Very Sus', name: 'Host' },
            error_source: 'host',
            what_happened: '<p>It says 200 OK but... something feels off.</p>',
            what_can_i_do: '<p>Vote to eject the imposter.</p>',
        }
    },
];


export const errorPresets = [
    // 1xx: Informational
    createPreset(100, 'Continue', "We are ready. Are you?", "Please proceed. We are listening intently.", 'error', 'host'),
    createPreset(101, 'Switching Protocols', "Changing the rules of the game.", "Upgrade your expectations.", 'error', 'host'),
    createPreset(102, 'Processing', "Still thinking...", "Patience is a virtue. We have none.", 'error', 'host'),
    createPreset(103, 'Early Hints', "Here's a spoiler.", "Preload your assets.", 'error', 'host'),

    // 2xx: Success
    createPreset(200, 'OK', "It actually worked.", "Don't touch anything, it might break.", 'error', 'host'),
    createPreset(201, 'Created', "It's a boy! Or a girl. It's a resource.", "Cherish it.", 'error', 'host'),
    createPreset(202, 'Accepted', "We'll think about it.", "Your request is in the queue. Somewhere.", 'error', 'host'),
    createPreset(203, 'Non-Authoritative Information', "I heard this from a guy who knows a guy.", "Trust me, bro.", 'error', 'host'),
    createPreset(204, 'No Content', "The void stares back.", "Enjoy the silence.", 'error', 'host'),
    createPreset(205, 'Reset Content', "Tabula rasa.", "Refresh your perspective.", 'error', 'host'),
    createPreset(206, 'Partial Content', "Here is a piece of the puzzle.", "Collect them all.", 'error', 'host'),
    createPreset(207, 'Multi-Status', "It's complicated.", "Check the XML. If you dare.", 'error', 'host'),
    createPreset(208, 'Already Reported', "I already told you.", "Déjà vu.", 'error', 'host'),
    createPreset(218, 'This is fine', "Everything is burning, but it's fine.", "Just smile and wave.", 'error', 'host'),
    createPreset(226, 'IM Used', "I'm used.", "Recycled content is eco-friendly.", 'error', 'host'),

    // 3xx: Redirection
    createPreset(300, 'Multiple Choices', "Decisions, decisions.", "Pick a card, any card.", 'error', 'host'),
    createPreset(301, 'Moved Permanently', "It's gone. Like your motivation.", "Update your bookmarks. Or don't.", 'error', 'host'),
    createPreset(302, 'Found', "It's hiding somewhere else.", "Catch me if you can.", 'error', 'host'),
    createPreset(303, 'See Other', "Look over there!", "Distraction tactic.", 'error', 'host'),
    createPreset(304, 'Not Modified', "Same old, same old.", "If it ain't broke, don't fix it.", 'error', 'host'),
    createPreset(305, 'Use Proxy', "I'm not talking to you directly.", "Talk to my lawyer (proxy).", 'error', 'host'),
    createPreset(306, 'Switch Proxy', "The old proxy was lame.", "Upgrade your middleman.", 'error', 'host'),
    createPreset(307, 'Temporary Redirect', "Just passing through.", "Don't get too comfortable.", 'error', 'host'),
    createPreset(308, 'Permanent Redirect', "Moved to a better place.", "We're never coming back.", 'error', 'host'),

    // 4xx: Client error
    createPreset(400, 'Bad Request', "It's not me, it's you.", "Try making sense next time.", 'error', 'host'),
    createPreset(401, 'Unauthorized', "New phone, who dis?", "Login, maybe?", 'error', 'host'),
    createPreset(402, 'Payment Required', "Show me the money.", "No free lunch.", 'error', 'host'),
    createPreset(403, 'Forbidden', "You shall not pass!", "Go away.", 'error', 'host'),
    createPreset(404, 'Not Found', "I looked everywhere. Even under the couch.", "It's gone. Forever.", 'error', 'host'),
    createPreset(405, 'Method Not Allowed', "Don't do that.", "Method acting is not allowed here.", 'error', 'host'),
    createPreset(406, 'Not Acceptable', "I have standards.", "Be better.", 'error', 'host'),
    createPreset(407, 'Proxy Authentication Required', "The bouncer needs a tip.", "Pay the toll.", 'error', 'host'),
    createPreset(408, 'Request Timeout', "I got bored waiting.", "Type faster.", 'error', 'host'),
    createPreset(409, 'Conflict', "We have a problem.", "Agree to disagree.", 'error', 'host'),
    createPreset(410, 'Gone', "History is written by the victors.", "It's ancient history now.", 'error', 'host'),
    createPreset(411, 'Length Required', "Size matters.", "Tell me how long it is.", 'error', 'host'),
    createPreset(412, 'Precondition Failed', "You promised.", "Conditions were not met.", 'error', 'host'),
    createPreset(413, 'Payload Too Large', "That's what she said.", "Split it up.", 'error', 'host'),
    createPreset(414, 'URI Too Long', "TL;DR.", "Keep it brief.", 'error', 'host'),
    createPreset(415, 'Unsupported Media Type', "We don't do that here.", "Try PDF. Everyone loves PDF.", 'error', 'host'),
    createPreset(416, 'Range Not Satisfiable', "You're reaching.", "Stay within your limits.", 'error', 'host'),
    createPreset(417, 'Expectation Failed', "My expectations were low, but holy cow.", "Lower your standards.", 'error', 'host'),
    createPreset(418, 'I\'m a teapot', "Short and stout.", "Make tea, not war.", 'error', 'host'),
    createPreset(419, 'Page Expired', "Like milk.", "Refresh and smell the roses.", 'error', 'host'),
    createPreset(420, 'Enhance your calm', "Chill out, man.", "Take a deep breath.", 'error', 'host'),
    createPreset(421, 'Misdirected Request', "Wrong number.", "I don't know who you're looking for.", 'error', 'host'),
    createPreset(422, 'Unprocessable Entity', "Logic is sound, but I refuse.", "I just can't deal with this right now.", 'error', 'host'),
    createPreset(423, 'Locked', "Where is the key?", "Knock harder.", 'error', 'host'),
    createPreset(424, 'Failed Dependency', "Blame the other guy.", "It's a domino effect.", 'error', 'host'),
    createPreset(425, 'Too Early', "Go back to sleep.", "The worm is not for the early bird today.", 'error', 'host'),
    createPreset(426, 'Upgrade Required', "Your tech is ancient.", "Get with the times.", 'error', 'host'),
    createPreset(428, 'Precondition Required', "Say the magic word.", "You forgot something.", 'error', 'host'),
    createPreset(429, 'Too Many Requests', "Slow down, cowboy.", "You're clicking too fast.", 'error', 'host'),
    createPreset(430, 'Request Header Fields Too Large', "Ego check.", "Your headers are too big.", 'error', 'host'),
    createPreset(431, 'Request Header Fields Too Large', "Too much baggage.", "Travel light.", 'error', 'host'),
    createPreset(440, 'Login Time-out', "Time's up.", "You snoozed, you lost.", 'error', 'host'),
    createPreset(444, 'No Response', "...", "Ghosted.", 'error', 'host'),
    createPreset(449, 'Retry With', "Try again.", "With feeling this time.", 'error', 'host'),
    createPreset(450, 'Blocked by Windows Parental Controls', "Go ask your parents.", "You're grounded.", 'error', 'host'),
    createPreset(451, 'Unavailable For Legal Reasons', "My lawyer said no.", "Censored.", 'error', 'host'),
    createPreset(460, 'Client closed connection prematurely', "You hung up.", "Rude.", 'error', 'host'),
    createPreset(463, 'Too many forwarded IP addresses', "Too many cooks.", "The kitchen is crowded.", 'error', 'host'),
    createPreset(464, 'Incompatible protocol', "We don't speak the same language.", "Learn to communicate.", 'error', 'host'),
    createPreset(494, 'Request header too large', "Big head mode.", "Inflated headers.", 'error', 'host'),
    createPreset(495, 'SSL Certificate Error', "Trust issues.", "I don't trust you.", 'error', 'host'),
    createPreset(496, 'SSL Certificate Required', "Show me your ID.", "No ID, no entry.", 'error', 'host'),
    createPreset(497, 'HTTP Request Sent to HTTPS Port', "Secure your life.", "We only do secure here.", 'error', 'host'),
    createPreset(498, 'Invalid Token', "Fake ID.", "Nice try.", 'error', 'host'),
    createPreset(499, 'Client Closed Request', "You left.", "Was it something I said?", 'error', 'host'),

    // 5xx: Server error
    createPreset(500, 'Internal Server Error', "Code monkey fall down.", "We blame the intern.", 'error', 'cloudflare'),
    createPreset(501, 'Not Implemented', "I can't do that, Dave.", "Coming soon. Maybe.", 'error', 'host'),
    createPreset(502, 'Bad Gateway', "The middleman is drunk.", "Pass the buck.", 'error', 'cloudflare'),
    createPreset(503, 'Service Unavailable', "Nap time.", "The server is on a coffee break.", 'error', 'host'),
    createPreset(504, 'Gateway Timeout', "The hamster died.", "Feed the hamster.", 'error', 'cloudflare'),
    createPreset(505, 'HTTP Version Not Supported', "Too futuristic.", "We like the old ways.", 'error', 'host'),
    createPreset(506, 'Variant Also Negotiates', "We couldn't agree on anything.", "Negotiations broke down.", 'error', 'host'),
    createPreset(507, 'Insufficient Storage', "I'm full.", "No more room for dessert.", 'error', 'host'),
    createPreset(508, 'Loop Detected', "Groundhog Day.", "And again. And again.", 'error', 'host'),
    createPreset(509, 'Bandwidth Limit Exceeded', "You used all the internet.", "Go outside.", 'error', 'host'),
    createPreset(510, 'Not Extended', "I need more.", "Extensions required.", 'error', 'host'),
    createPreset(511, 'Network Authentication Required', "Login first.", "Who sent you?", 'error', 'cloudflare'),
    createPreset(520, 'Web server is returning an unknown error', "Something happened.", "We don't know what, but it's bad.", 'error', 'cloudflare'),
    createPreset(521, 'Web server is down', "It's dead, Jim.", "He's dead.", 'error', 'cloudflare'),
    createPreset(522, 'Connection timed out', "Connection timed out.", "The server is ghosting us.", 'error', 'cloudflare'),
    createPreset(523, 'Origin is unreachable', "You can't get there from here.", "Road closed.", 'error', 'cloudflare'),
    createPreset(524, 'A Timeout Occurred', "Still waiting...", "It's been 84 years...", 'error', 'cloudflare'),
    createPreset(525, 'SSL handshake failed', "Awkward greeting.", "Left hanging.", 'error', 'cloudflare'),
    createPreset(526, 'Invalid SSL certificate', "Sketchy certificate.", "Looks fake to me.", 'error', 'cloudflare'),
    createPreset(527, 'Railgun Listener to Origin', "Railgun error.", "Sounds cool, but it's broken.", 'error', 'cloudflare'),
    createPreset(529, 'The service is overloaded', "Too much love.", "We are popular.", 'error', 'host'),
    createPreset(530, 'Site Frozen', "Let it go.", "Frozen in time.", 'error', 'cloudflare'),
    createPreset(561, 'Unauthorized', "Access denied by the other guy.", "Not my fault.", 'error', 'cloudflare'),
    createPreset(598, 'Network read timeout error', "I can't read this.", "Illiterate network.", 'error', 'cloudflare'),
    createPreset(599, 'Network Connect Timeout Error', "I can't connect.", "Lonely network.", 'error', 'cloudflare'),

    // Other
    createPreset(999, 'Request Denied', "No. Just no.", "Don't ask again.", 'error', 'cloudflare'),
];

export const successPreset = {
    id: 'success-easter-egg',
    type: 'success',
    category: 'success',
    params: {
        title: 'Welcome!',
        error_code: 200,
    }
};

export const allPresets = [...creativePresets, ...errorPresets, successPreset];

