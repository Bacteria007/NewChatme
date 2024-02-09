export const GetDuration = (timestamp) => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInMilliseconds = now - createdAt;
    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    // console.log(`years===>>> ${years}`)
    // console.log(`days===>>> ${days}`)
    // console.log(`months===>>> ${months}`)
    // console.log(`minutes===>>> ${minutes}`)
    // console.log(`seconds===>>> ${seconds}`)
    if (years > 0 && years != NaN) {
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    } else if (months > 0 && months != NaN) {
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else if (days > 0 && days != NaN) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0 && hours != NaN) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0 && minutes != NaN) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (seconds > 0 && seconds!=NaN) {
        return 'Just now';
    }
    else {
        return 'NaN time ago';
    }
}