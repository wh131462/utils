import inquirer from 'inquirer';

/**
 * 提示输入
 * @param question
 * @param defaultValue
 * @param type
 * @param validate
 * @returns {Promise<unknown>}
 */
export const inquire = (question, defaultValue = null, type = 'input', validate = () => true) => {
    return new Promise((resolve, reject) => {
        inquirer
            .prompt(
                [
                    {
                        type: type,
                        name: 'answer',
                        message: question,
                        default: defaultValue,
                        validate: (input) => {
                            if (validate(input)) {
                                return true;
                            }
                            return 'Invalid input, please try again.';
                        }
                    }
                ],
                null
            )
            .then((answers) => {
                resolve(answers.answer);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
/**
 * 确认
 * @param question
 * @param defaultValue
 * @param type
 * @param validate
 * @returns {Promise<unknown>}
 */
export const comfirm = (question, defaultValue = null, type = 'confirm', validate = () => true) => {
    return new Promise((resolve, reject) => {
        inquirer
            .prompt(
                [
                    {
                        type: type,
                        name: 'answer',
                        message: question,
                        default: defaultValue,
                        validate: (input) => {
                            if (validate(input)) {
                                return true;
                            }
                            return 'Invalid input, please try again.';
                        }
                    }
                ],
                null
            )
            .then((answers) => {
                resolve(answers.answer);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
/**
 * 选择列表
 * @param question
 * @param defaultValue
 * @param choices
 * @returns {Promise<unknown>}
 */
export const select = (question, defaultValue = null, choices = []) => {
    return new Promise((resolve, reject) => {
        inquirer
            .prompt(
                [
                    {
                        type: 'list',
                        name: 'answer',
                        message: question,
                        choices: choices,
                        default: defaultValue
                    }
                ],
                null
            )
            .then((answers) => {
                resolve(answers.answer);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
