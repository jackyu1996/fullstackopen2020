export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);

    if (bmi < 15) {
        return "Very severely underweight";
    } else if (bmi < 16) {
        return "Severely underweight";
    } else if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 25) {
        return "Normal (healthy weight)";
    } else if (bmi < 30) {
        return "Overweight";
    } else if (bmi < 35) {
        return "Obese Class I (Moderately obese)";
    } else if (bmi < 40) {
        return "Obese Class II (Severely obese)";
    } else {
        return "Obese Class III (Very severely obese)";
    }
};

const parseArgs = (args: Array<string>): Array<number> => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");

    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (height && weight) {
        return [height, weight];
    } else {
        throw new Error("You are not giving me actual numbers, are you?");
    }
};

if (require.main === module) {
    try {
        const [height, weight] = parseArgs(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log("Error:", e.message);
        }
    }
}
