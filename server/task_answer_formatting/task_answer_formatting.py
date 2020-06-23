# Test module that prints hello world
import json

def hello_world_mod():
    return 'hello world from test mod!!'

def preload_answers_html_output(json_path):
    all_tasks = read_test_task_json_data(json_path)

    num_tasks = len(all_tasks)

    html_test = ''

    for task in range(num_tasks):
        html_test = html_test + '\n' + display_single_task(task+1, all_tasks[task])
    return all_tasks, html_test

def read_test_task_json_data(json_path):
    with open(json_path) as f:
        data = json.load(f)
        all_tasks = data['data']
        return all_tasks

def dh(x):
    return x

def display_single_context(context, start_index, end_index):

    before_answer = context[:start_index]
    answer = context[start_index:end_index]
    after_answer = context[end_index:]

    content = before_answer + "<span class='answer'>" + answer + "</span>" + after_answer

    return """<div class="single_answer">{}</div>""".format(content)

def display_single_title_and_pmid(title, pmid):

    content = str(pmid) + ": <a href=\"https://pubmed.ncbi.nlm.nih.gov/" + str(pmid) + "\"><span class='title'>" + title + "</span></a>"

    return """</p><div class="single_answer">{}</div>""".format(content)

def display_question_title(question):
    return "<h2 class='question_title'>{}</h2>".format(question.capitalize())


def display_all_contexts(index, question, html_out_all_contexts=''):

    def answer_not_found(context, start_index, end_index):
        return (start_index == 0 and len(context) == end_index) or (start_index == 0 and end_index == 0)

    html_out_all_contexts = html_out_all_contexts + '\n' + display_question_title(str(index + 1) + ". " + question['question'].capitalize())

    # display context
    for i in question['results']:
        if answer_not_found(i['context'], i['start_index'], i['end_index']):
            continue # skip not found questions
        html_out_all_contexts = html_out_all_contexts + '\n' + display_single_title_and_pmid(i['title'], i['pmid'])
        html_out_all_contexts = html_out_all_contexts + '\n' + display_single_context(i['context'], i['start_index'], i['end_index'])
    return html_out_all_contexts


def display_task_title(index, task):
    task_title = "Task " + str(index) + ": " + task
    return "<h1 class='task_title'>{}</h1>".format(task_title)

def display_single_task(index, task, html_out_single_task=''):

    html_out_single_task = html_out_single_task + '\n' + display_task_title(index, task['task'])

    for i, question in enumerate(task['questions']):
        #print(question)
        html_out_single_task = html_out_single_task + '\n' + display_all_contexts(i, question)

    return html_out_single_task


if __name__ == '__main__':
    '''
    all_tasks = read_test_task_json_data('../test_data/lassa_answer_from_qa.json')

    print(len(all_tasks))

    num_tasks = len(all_tasks)

    html_test = ''

    for task in range(num_tasks):
        html_test = html_test + '\n' + display_single_task(task+1, all_tasks[task])
    '''

    html_test = preload_answers_html_output('../test_data/lassa_answer_from_qa.json')

    #task = 1
    #html_test = display_single_task(task, all_tasks[task-1])

    #print(all_tasks[task-1])
    print(html_test)
