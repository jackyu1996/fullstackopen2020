interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export type exercisesData = {
    daily_exercises: Array<number>;
    target: number;
};

export const calculateExercises = (
    exercises: Array<number>,
    target: number
): ExerciseResult => {
    const periodLength = exercises.length;
    const trainingDays = exercises.filter((e) => e !== 0).length;
    const totalExerciseHours = exercises.reduce((acc, cur) => acc + cur, 0);
    const average = totalExerciseHours / periodLength;
    const success = average >= target ? true : false;

    const gap = average - target;
    let rating: number;
    let ratingDescription: string;

    if (gap < -0.5) {
        rating = 1;
        ratingDescription = "you can do better than this";
    } else if (gap < 0) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 3;
        ratingDescription = "yay, you have outdone yourself";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

const parseArgs = (args: Array<string>): Array<number> => {
    // make sure the target and as least one exercise given
    if (args.length < 4) {
        throw new Error("Not enough arguments");
    }

    const numArr = args.slice(2).map((e) => Number(e));
    if (numArr.every((n) => !isNaN(n))) {
        return numArr;
    } else {
        throw new Error("You are not giving me actual numbers, are you?");
    }
};

if (require.main === module) {
    try {
        const [target, ...exercises] = parseArgs(process.argv);
        console.log(calculateExercises(exercises, target));
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log("Error:", e.message);
        }
    }
}
