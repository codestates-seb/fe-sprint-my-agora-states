const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussionavatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussioncontent";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussionanswered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const img = document.createElement('img')
  img.src = obj.avatarUrl;
  img.alt = "avatar of " + obj.author;
  img.className = 'discussionavatar--image'
  avatarWrapper.append(img)

  const title = document.createElement('h2')
  const subtitle = document.createElement('a')
  title.className = 'discussiontitle'
  subtitle.href = obj.url;
  subtitle.textContent = obj.title;
  subtitle.className = 'discussioninformation'
  title.append(subtitle);

  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
  discussionContent.append(title,discussionInformation)


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;