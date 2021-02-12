package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"text/template"
)

const (
	readmeTemplateFileName = "README.md.tmpl"
	docTemplateFileName    = "index.html.tmpl"
)

var (
	readmeTemplate = template.Must(template.New(readmeTemplateFileName).ParseFiles(readmeTemplateFileName))
	docTemplate    = template.Must(template.New(docTemplateFileName).ParseFiles(docTemplateFileName))
)

func createREADME(dirname, code string) error {
	path := fmt.Sprintf("%s/README.md", dirname)
	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0755)
	if err != nil {
		return err
	}
	defer f.Close()

	return readmeTemplate.Execute(f, map[string]string{
		"Name":   dirname,
		"Script": code,
	})
}

func createBookmarklet(name string) string {
	return fmt.Sprintf(
		`javascript:void((function(){var s = document.createElement("script");s.type = "text/javascript";s.src = "https://cdn.jsdelivr.net/gh/serizawa-jp/roamkit@main/bookmarklets/%s/%s.js";document.getElementsByTagName("head")[0].appendChild(s);})());`,
		name,
		name,
	)
}

func createDoc(scripts []Script) error {
	path := "../docs/index.html"
	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0755)
	if err != nil {
		return err
	}
	defer f.Close()

	return docTemplate.Execute(f, map[string]interface{}{
		"Scripts": scripts,
	})
}

func getDescription(dir string) string {
	path := fmt.Sprintf("%s/.description", dir)
	b, err := ioutil.ReadFile(path)
	if err != nil {
		return ""
	}
	return string(b)
}

type Script struct {
	Name        string
	Code        string
	Description string
}

func main() {
	os.Exit(runMain())
}

func runMain() int {
	var bookmarkletDirs []string

	if err := filepath.Walk(".", func(path string, info os.FileInfo, err error) error {
		if info.Name() == "." {
			return nil
		}

		if info.IsDir() {
			bookmarkletDirs = append(bookmarkletDirs, path)
		}

		return nil
	}); err != nil {
		return 1
	}

	var scripts = []Script{}
	for _, d := range bookmarkletDirs {
		code := createBookmarklet(d)
		if err := createREADME(d, code); err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] failed to create a README: %v\n", err)
			return 1
		}

		s := Script{
			Name:        d,
			Code:        code,
			Description: getDescription(d),
		}
		scripts = append(scripts, s)
	}

	if err := createDoc(scripts); err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] failed to create a doc: %v\n", err)
		return 1
	}

	return 0
}
