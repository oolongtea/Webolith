from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext
from wordwalls.views import searchForAlphagrams
from wordwalls.forms import LexiconForm, FindWordsForm
from base.models import Lexicon, Alphagram
import json
from django.core.urlresolvers import reverse

@login_required
def createQuiz(request):
    if request.method == 'GET':                
        return render_to_response('whitleyCards/index.html', 
                            {'accessedWithGet': True }, 
                            context_instance=RequestContext(request))
    elif request.method == 'POST':
        if request.POST['action'] == 'searchParamsFlashcard':
            lexForm = LexiconForm(request.POST)
            fwForm = FindWordsForm(request.POST)   # form bound to the POST data
            if lexForm.is_valid() and fwForm.is_valid():
                lex = Lexicon.objects.get(lexiconName=lexForm.cleaned_data['lexicon'])
                asd = searchForAlphagrams(fwForm.cleaned_data, lex)
                #questionData = getWordDataByProb(alphasSearchDescription['min'], alphasSearchDescription['max'])
                response = HttpResponse(json.dumps(
                                                    {'url': reverse('flashcards_by_prob_pk_range', args=(asd['min'], asd['max'])),
                                                    'success': True}
                                                    ),
                                                    mimetype="application/javascript")
                response['Content-Type'] = 'text/plain; charset=utf-8'
                return response

@login_required  
def probPkRange(request, minP, maxP):     
    if request.method == 'GET':               
        return render_to_response('whitleyCards/quiz.html', {'minIndex': minP, 'maxIndex': maxP}, 
                                                context_instance=RequestContext(request))
    elif request.method == 'POST':
        action = request.POST['action']
        if action == 'getInitialSet':
            minP = int(minP)
            maxP = int(maxP)

            maxPGet = maxP
            newMinP = -1
            if maxP-minP+1 > 100:
                # only quiz on first 100 and send new lower limit as part of data
                newMinP = minP + 100
                maxPGet = newMinP - 1
            wordData = getWordDataByProb(minP, maxPGet)

            response = HttpResponse(json.dumps(
                                                {'data': wordData,
                                                'nextMinP': newMinP,
                                                'nextMaxP': maxP }
                                                ),
                                                mimetype="application/javascript")
            response['Content-Type'] = 'text/plain; charset=utf-8'
            return response
                            
def getWordDataByProb(minP, maxP):
    data = []
    numAlphas = 0
    for i in range(minP, maxP+1):
        alpha = Alphagram.objects.get(pk=i)
        for j in alpha.word_set.all():
            data.append({'w': j.word, 'd': j.definition})
        numAlphas+= 1

    return data