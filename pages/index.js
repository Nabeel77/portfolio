import React, { useState, useEffect, useCallback } from 'react';
import Hero from '../components/Hero';
import Expertise from '../components/Expertise';
import Work from '../components/Work';
import Me from '../components/Me';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Divider from '../components/Divider';
import { useRouter } from 'next/router';
import { getSkills, getProjects } from '../server/staticDataFetching';

export default function Home({ scrollRefs, skills, projects }) {
  const [index, setIndex] = useState(null);

  const router = useRouter();
  const elements = [
    <Hero key={0} />,
    <Me key={1} />,
    <Expertise key={2} skillSetsArr={skills} />,
    <Work key={3} projectsArr={JSON.parse(projects)} />,
    <Experience key={4} />,
    <Contact key={5} />,
  ];

  useEffect(() => {
    if ('key' in router.query) {
      setIndex(router.query.key);
    }
  }, []);

  useEffect(() => {
    if (index) {
      scrollRefs.current[index].current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [index]);

  return (
    <div className="">
      <div className="py-28 px-10 flex flex-col gap-5">
        {elements.map((item, index) => (
          <div key={index}>
            <div
              ref={scrollRefs.current[index]}
              className={`${index === 0 ? 'h-screen' : 'h-max'} w-full`}
            >
              {item}
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const skills = await getSkills();
  const projects = await getProjects();
  return {
    props: {
      skills: skills,
      projects: JSON.stringify(projects),
    },
  };
}
