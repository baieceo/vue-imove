export const linkRegex = /((?:www|https?:)+[^\s]+)/g;

export const Helper = {
    isLink(value) {
        return linkRegex.test(value);
    },
    extractLinks(value) {
        return value.split(linkRegex);
    },
    isPlainObject(value) {
        return typeof value === 'object' && value !== null;
    },
    getArgsToString(args) {
        return args
            .map((o) => {
                if (Helper.isPlainObject(o)) {
                    return JSON.stringify(o);
                } else {
                    return o;
                }
            })
            .join(' ');
    },
};

export const hijackMap = {
    log: {
        bgColor: '#272823',
        textColor: '#ffffff',
        borderColor: 'rgba(128, 128, 128, 0.35)',
        icon: "logIcon",
        originMethod: console.log,
    },
    info: {
        bgColor: '#272823',
        textColor: '#ffffff',
        borderColor: 'rgba(128, 128, 128, 0.35)',
        icon: "logIcon icon-sam icon-sam-info",
        originMethod: console.info,
    },
    warn: {
        bgColor: 'rgb(51, 42, 0)',
        textColor: 'rgb(245, 211, 150)',
        borderColor: 'rgb(102, 85, 0)',
        icon: "logIcon icon-sam icon-sam-warn",
        originMethod: console.warn,
    },
    debug: {
        bgColor: '#272823',
        textColor: 'rgb(77, 136, 255)',
        borderColor: 'rgba(128, 128, 128, 0.35)',
        icon: "logIcon icon-sam icon-sam-bug",
        originMethod: console.debug,
    },
    error: {
        bgColor: 'rgb(40, 0, 0)',
        textColor: 'rgb(254, 127, 127)',
        borderColor: 'rgb(91, 0, 0)',
        icon: "logIcon icon-sam icon-sam-error",
        originMethod: console.error,
    },
};