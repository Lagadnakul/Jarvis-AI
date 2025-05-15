//Common response patterns and utilities 
export const getFallbackResponse = (input) => {
    const loweredInput = input.toLowerCase();

    const responses = {
        hello: "Hello! How Can I help you today?",
        time: () => `The current time is ${new Date().toLocaleTimeString()}`,
        date: () => `Today's date is ${new Date().toLocaleDateString()}`,
        weather: "I am sorry, I cannot provide weather information at the moment.",
        default: "I am sorry, I cannot assist you with that right now."
    };

    if (loweredInput.includes('hello') || loweredInput.includes('hi')) {
        return responses.hello;
    }
    if (loweredInput.includes('time')) {
        return responses.time();
    }
    if (loweredInput.includes('date')) {
        return responses.date();
    }
    if (loweredInput.includes('weather')) {
        return responses.weather;
    }
    return responses.default;
};

// Format API response
export const formatResponse = (success, data, error = null) => {
    return {
        success,
        ...(data && {data}),
        ...(error && {error})
    };
};